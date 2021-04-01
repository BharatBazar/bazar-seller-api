import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IOtpModel } from './otp.interface';
import { OTP } from './otp.schema';
import { otpGenerator } from './../../lib/helpers/index';

interface data {
    phoneNumber: string;
}
interface otp {
    otp: string;
}
class OtpModel {
    public sendOTP = async (data: data) => {
        console.log(data);
        const numberExist: boolean = await OTP.phoneNumberExist(data.phoneNumber);
        console.log(numberExist);
        const otp = otpGenerator().toString();
        if (numberExist) {
            await OTP.updateOne({ phoneNumber: data.phoneNumber }, { otp: otp }).lean();
            return otp;
        }

        const otpDocument: IOtpModel = new OTP({ otp, phoneNumber: data.phoneNumber });
        await otpDocument.save();
        return otp;
    };

    public verifyOTP = async (data: data & otp) => {
        console.log(data);

        const otp: IOtpModel | null = await OTP.findOne({ phoneNumber: data.phoneNumber }, 'otp').lean();

        if (!otp) {
            throw new HTTP400Error('OTP not found');
        } else {
            if (otp.otp == data.otp) {
                await OTP.deleteOne({ phoneNumber: data.phoneNumber });
                return true;
            } else {
                throw new HTTP400Error('OTP does not match');
            }
        }
    };
}

export default new OtpModel();
