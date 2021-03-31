import { Document } from 'mongoose';

interface otpInterface {
    phoneNumber: String;
    otp: String;
}

export interface IOtpModel extends otpInterface, Document {}
