import { IShopModel } from './../shop/shop.interface';
import { ShopModel } from './../shop/shop.model';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { log } from 'util';
import ShopPermissionModel from './../permission/permission.model';
import { ShopMember } from './shopmember.schema';
import { IShopMemberModel, shopMemberInterface, shopMemberRole } from './shopmember.interface';
import { LeanDocument } from 'mongoose';
import { shopMember_message } from '../../lib/helpers/customMessage';
import otpModel from '../otp/otp.model';
import { pruneFields } from '../../lib/helpers';
import { Shop } from '../shop/shop.schema';

export class ShopMemberModel {
    async checkPhoneNumber(data: { phoneNumber: string }) {
        const phoneNumber: boolean = await ShopMember.checkPhoneNumber(data.phoneNumber);
        if (phoneNumber) {
            throw new HTTP400Error('Phone number already exist please login.');
        } else {
            return otpModel.sendOTP(data);
        }
    }

    async createShopMember(data: shopMemberInterface & { otp: string }) {
        log(data);
        if (data.otp) {
            const isMatch = await otpModel.verifyOTP({ otp: data.otp, phoneNumber: data.phoneNumber });
            if (isMatch) {
                pruneFields(data, 'otp');
                let member: IShopMemberModel = new ShopMember(data);
                const shop: IShopModel = new Shop();
                member.shop = shop._id;
                await shop.save();
                member.permissions = await ShopPermissionModel.createPermisison(member.role);
                await member.save();
                return member;
            }
        } else {
            throw new HTTP400Error('Please provide otp.');
        }
    }

    async createPassword(data: { password: string; phoneNumber: string }) {
        const hashedPassword = await ShopMember.generatePassword(data.password);
        await ShopMember.updateOne({ phoneNumber: data.phoneNumber }, { password: hashedPassword }).exec();
        return 'Password created';
    }

    async ShopMemberLogin({ phoneNumber, password }: { phoneNumber: string; password: string }) {
        if (!phoneNumber) {
            throw new HTTP400Error('Phone number is required.');
        } else {
            let member: LeanDocument<IShopMemberModel> | null;
            member = await ShopMember.findOne({ phoneNumber })
                .populate({ path: 'permissions shop', populate: 'owner coOwner worker' })
                .lean();
            if (member) {
                if (!member.password) {
                    return {
                        passwordAvailable: false,
                    };
                } else {
                    const isMatch = await ShopMember.comparePassword(password, member.password);
                    if (isMatch) {
                        if (member.role == shopMemberRole.coOwner || member.role === shopMemberRole.worker) {
                            if (member.isTerminated) {
                                throw new HTTP400Error(
                                    'Your account is not activated ask shop owner to activated your account.',
                                );
                            } else if (!member.shop.isVerified) {
                                throw new HTTP400Error(
                                    'Shop verification is still pending our representative will come and verify your shop.',
                                );
                            } else {
                                return member;
                            }
                        } else if (!member.shop.isVerified) {
                            if (!member.shop.name) {
                                return {
                                    shopNameAvailable: false,
                                };
                            } else if (member.shop.coOwner.length == 0 && member.shop.membersDetailSkipped) {
                                return {
                                    memberDetails: false,
                                };
                            } else {
                                return {
                                    shopVerification: false,
                                };
                            }
                        } else {
                            return member;
                        }
                    } else throw new HTTP400Error(shopMember_message.PASSWORD_NOT_MATCH);
                }
            } else {
                throw new HTTP400Error(
                    'Phone number does not exist please tell your shop owner to add you as a member. If you are owner please add your dukan.',
                );
            }
        }
    }
}

export default new ShopMemberModel();
