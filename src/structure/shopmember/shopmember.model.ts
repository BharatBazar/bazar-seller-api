import { keepFields } from './../../lib/helpers/index';
import { IShopModel } from './../shop/shop.interface';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import ShopPermissionModel from './../permission/permission.model';
import { ShopMember } from './shopmember.schema';
import { IShopMemberModel, shopMemberInterface, shopMemberRole } from './shopmember.interface';
import { FilterQuery, LeanDocument, Types, UpdateQuery } from 'mongoose';
import { shopMember_message } from '../../lib/helpers/customMessage';
import otpModel from '../otp/otp.model';
import { pruneFields } from '../../lib/helpers';
import { Shop } from '../shop/shop.schema';
import { ShopPermissions } from '../permission/permission.schema';

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
        if (data.role == shopMemberRole.owner) {
            if (data.otp) {
                const isMatch = await otpModel.verifyOTP({ otp: data.otp.toString(), phoneNumber: data.phoneNumber });
                if (isMatch) {
                    pruneFields(data, 'otp');
                    let member: IShopMemberModel = new ShopMember({ ...data, isTerminated: false });
                    const shop: IShopModel = new Shop();
                    member.shop = shop._id;
                    shop.owner = member._id;
                    await shop.save();
                    member.permissions = await ShopPermissionModel.createPermisison(member.role);
                    await member.save();
                    return member;
                }
            } else {
                throw new HTTP400Error('Please provide otp.');
            }
        } else {
            const memberExist = await ShopMember.checkPhoneNumber(data.phoneNumber);
            if (memberExist) {
                throw new HTTP400Error(
                    'Phone number is already registered . If you want to create your own digital dukan tell your previous dukan owner to delete your membership from his dukan.',
                );
            } else {
                let member: IShopMemberModel = new ShopMember({ ...data, isTerminated: true });
                await Shop.findByIdAndUpdate(data.shop, {
                    $push: data.role == shopMemberRole.coOwner ? { coOwner: member._id } : { worker: member._id },
                });
                member.shop = data.shop;
                member.permissions = await ShopPermissionModel.createPermisison(member.role);

                await member.save();
                return member;
            }
        }
    }

    async verifyShopMember(data: { phoneNumber: string }) {
        const memberExist = await ShopMember.findOne({ phoneNumber: data.phoneNumber });
        console.log(data);
        if (memberExist) {
            throw new HTTP400Error(
                'Phone number is already registered . If you want to create your own digital dukan tell your previous dukan owner to delete your membership from his dukan.',
            );
        } else {
            //Send a link for setting password page which will be valid for 10 minutes
            //In 10 minutes they need to set password of the device
            return otpModel.sendOTP(data);
        }
    }

    async checkMemberExist(data: FilterQuery<IShopMemberModel>) {
        const memberExist = await ShopMember.findOne(data);
        if (memberExist) {
            return memberExist;
        } else {
            throw new HTTP400Error('Member does not exist with the given condition');
        }
    }

    async matchOtp(otp: string, phoneNumber: string) {
        const isMatch = await otpModel.verifyOTP({ otp: otp.toString(), phoneNumber: phoneNumber });
        if (isMatch) {
            return true;
        } else {
            if (!otp) {
                throw new HTTP400Error('Please provide otp.');
            } else if (!phoneNumber) {
                throw new HTTP400Error('Please provide phone number.');
            }
        }
    }

    async deleteShopMember(data: string) {
        const a = await this.checkMemberExist({ _id: data });
        console.log('a =>', a);
        if (a) {
            if (a.role == shopMemberRole.owner) {
                throw new HTTP400Error('Sorry cannot delete this account');
            } else {
                await ShopPermissions.findByIdAndDelete(a.permissions);
                const condition: UpdateQuery<IShopModel> = {};
                if (a.role == shopMemberRole.worker) {
                    condition['$pull'] = { worker: a._id };
                } else if (a.role == shopMemberRole.coOwner) {
                    condition['$pull'] = { coOwner: a._id };
                }
                await Shop.findOneAndUpdate({ _id: a.shop }, condition);
                await ShopMember.findByIdAndDelete(a._id);
                return 'Member deleted';
            }
        }
    }

    async updateShopMember(data: shopMemberInterface & { otp: string }) {
        console.log(data);
        if (data.phoneNumber && data._id) {
            const memberExist = await this.checkMemberExist({ _id: data._id });
            console.log(memberExist);
            if (memberExist.phoneNumber == data.phoneNumber) {
                await otpModel.deleteOTP(memberExist.phoneNumber);
                keepFields(data, 'firstName lastName _id');
                console.log(data);
                await ShopMember.updateOne({ _id: data._id }, data);
                return 'Details updated';
            } else {
                await this.matchOtp(data.otp, data.phoneNumber);
                keepFields(data, 'firstName lastName phoneNumber _id');
                console.log(data);
                await ShopMember.updateOne({ _id: data._id }, data);
                return 'Details updated';
            }
        } else {
            if (!data.phoneNumber) throw new HTTP400Error('Please provide phone number.');
            else {
                throw new HTTP400Error('Please provide document id for updation.');
            }
        }
    }

    async addShopMember(data: shopMemberInterface & { otp: string }) {
        if (data.otp && data.shop) {
            const isMatch = await otpModel.verifyOTP({ otp: data.otp.toString(), phoneNumber: data.phoneNumber });
            if (isMatch) {
                pruneFields(data, 'otp');
                let member: IShopMemberModel = new ShopMember({ ...data, isTerminated: true });
                await Shop.findByIdAndUpdate(data.shop, {
                    $push: data.role == shopMemberRole.coOwner ? { coOwner: member._id } : { worker: member._id },
                });
                member.shop = data.shop;
                member.permissions = await ShopPermissionModel.createPermisison(member.role);

                await member.save();
                return member;
            } else {
                throw new HTTP400Error('Otp does not match');
            }
        } else {
            if (!data.otp) {
                throw new HTTP400Error('Please provide otp.');
            } else if (!data.shop) {
                throw new HTTP400Error('Please provide shop details.');
            }
        }
    }

    async createPassword(data: { password: string; phoneNumber: string }) {
        if (!(await ShopMember.checkPhoneNumber(data.phoneNumber))) {
            throw new HTTP400Error('Password cannot be set.');
        }
        const hashedPassword = await ShopMember.generatePassword(data.password);
        await ShopMember.updateOne({ phoneNumber: data.phoneNumber }, { password: hashedPassword }).exec();
        return 'Password created';
    }

    async deleteMember(data: { _id: Types.ObjectId }) {
        const success: IShopMemberModel | null = await ShopMember.findById(data._id);
        if (success) {
            await ShopPermissions.findByIdAndDelete(success.permissions);
            await ShopMember.findByIdAndDelete(data._id);
            console.log('Dukan member deleted', success);
            return 'Dukan member deleted!!';
        } else {
            throw new HTTP400Error('Trouble deleting dukan member');
        }
    }

    async forgetPassword({ phoneNumber, verify, otp }: { phoneNumber: string; verify: boolean; otp: string }) {
        if (!phoneNumber) {
            throw new HTTP400Error('Phone number is required.');
        } else {
            let member: boolean;
            member = (await ShopMember.findOne({ phoneNumber }).countDocuments()) > 0;
            if (member) {
                if (verify) {
                    const matched: boolean = await otpModel.verifyOTP({ otp, phoneNumber });
                    if (matched) {
                        return { otpVerified: true };
                    }
                } else {
                    return otpModel.sendOTP({ phoneNumber });
                }
            } else {
                throw new HTTP400Error('Phone number does not exist.');
            }
        }
    }

    async updatePassword(data: { password: string; phoneNumber: string }) {
        const password = await this.createPassword(data);
        if (password) {
            return 'Password created';
        }
    }

    async ShopMemberLogin({ phoneNumber, password }: { phoneNumber: string; password: string }) {
        if (!phoneNumber) {
            throw new HTTP400Error('Phone number is required.');
        } else {
            let member: LeanDocument<IShopMemberModel> | null;
            member = await ShopMember.findOne({ phoneNumber }).populate({ path: 'permissions shop' }).lean();
            if (member) {
                if (!member.password) {
                    return {
                        passwordAvailable: true,
                        data: member,
                    };
                } else {
                    const isMatch = await ShopMember.comparePassword(password, member.password);
                    pruneFields(member, 'password');
                    if (isMatch) {
                        if (member.role == shopMemberRole.coOwner || member.role === shopMemberRole.worker) {
                            if (member.isTerminated) {
                                throw new HTTP400Error(
                                    'Your account is not activated ask dukan owner to activate your account.',
                                );
                            } else if (!member.shop.isVerified) {
                                throw new HTTP400Error(
                                    'Shop verification is still pending our representative will come and verify your dukan.',
                                );
                            } else {
                                return { data: member };
                            }
                        } else if (!member.shop.isVerified) {
                            if (!member.shop.shopName) {
                                return {
                                    notShopNameAvailable: true,
                                    data: member,
                                };
                            } else if (!member.shop.state) {
                                return {
                                    notAddressAvailable: true,
                                    data: member,
                                };
                            } else if (!member.shop.shopMemberOnBoardingDone && !member.shop.membersDetailSkipped) {
                                return {
                                    notMemberDetails: true,
                                    data: member,
                                };
                            } else if (!member.shop.isVerified) {
                                return {
                                    notShopVerification: true,
                                    data: member,
                                };
                            }
                        } else {
                            if (member.shop.sellingItems.length == 0) {
                                return {
                                    notCategory: true,
                                    data: member,
                                };
                            } else return { data: member };
                        }
                    } else throw new HTTP400Error(shopMember_message.PASSWORD_NOT_MATCH);
                }
            } else {
                throw new HTTP400Error(
                    'Phone number does not exist please tell your dukan owner to add you as a member. If you are owner please add your dukan.',
                );
            }
        }
    }
}

export default new ShopMemberModel();
