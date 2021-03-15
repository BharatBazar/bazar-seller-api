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
