import { HTTP400Error } from '../utils/httpErrors';
import jwt from 'jsonwebtoken';
/* All common helpers will come here */

/**
 * **Create new token**
 * ? This will create new jwt token for users every time.
 * @param user user Information here
 */
export const generateToken = async (data: any) =>
    jwt.sign({ data }, process.env.jwtSecretKey ? process.env.jwtSecretKey : 'jwtSecretKey');

/**
 * 6 digit otp generator.
 */
export const otpGenerator = (): number => Math.floor(100000 + Math.random() * 900000);

export const pruneFields = (body: any, fields: string) => {
    const fieldsArray = fields.split(' ');
    fieldsArray.forEach((field) => {
        delete body[field];
    });
};

export const keepFields = (body: any, fields: string) => {
    const fieldsArray = fields.split(' ');
    Object.keys(body).forEach((field) => {
        if (!fieldsArray.includes(field)) delete body[field];
    });
};
