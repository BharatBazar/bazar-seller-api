import { IOtpModel } from './otp.interface';
import { Schema, model, Model } from 'mongoose';

const OtpSchema: Schema = new Schema(
    {
        phoneNumber: {
            type: String,
            require: true,
            unique: true,
        },
        otp: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);

OtpSchema.statics.phoneNumberExist = async function (phoneNumber: string) {
    return (await this.findOne({ phoneNumber }).countDocuments()) > 0;
};

export const OTP: Model<IOtpModel> = model<IOtpModel>('OTP', OtpSchema);
