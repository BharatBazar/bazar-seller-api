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
                member.permissions = await ShopPermissionModel.createPermisison(member.role);
                await member.save();
                return member;
            }
        } else {
            throw new HTTP400Error('Please provide otp.');
        }
    }

    async ShopMemberLogin({ phoneNumber, password }: { phoneNumber: string; password: string }) {
        if (!phoneNumber || !password) {
            throw new HTTP400Error('Phone number & password is required.');
        } else {
            let phone: LeanDocument<IShopMemberModel> | null;
            phone = await ShopMember.findOne({ phoneNumber })
                .lean()
                .populate({ path: 'permissions shop', populate: 'owner coOwner worker' });
            if (phone) {
                if (!phone.shop.isAuthenticated) {
                    throw new HTTP400Error('Sorry! shop is not verified yet.');
                } else {
                    if (!phone.password) {
                        const hashedPassword = await ShopMember.generatePassword(password);

                        await ShopMember.updateOne({ phoneNumber }, { password: hashedPassword }).exec();
                        return phone;
                    } else {
                        const isMatch = await ShopMember.comparePassword(password, phone.password);
                        if (isMatch) return phone;
                        else throw new HTTP400Error(shopMember_message.PASSWORD_NOT_MATCH);
                    }
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
