import { Request, Response } from 'express';
import { responseData, responseMessage } from "../helpers/response";
import { statusCode } from "../config/statusCode";
import * as service from "../services/index";
import { error,creating,user_not_logged } from '../helpers/constant';


// User register
export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const result = await service.userService.createUser(req.body);
        if (!result) {
            responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage(error, creating) });
            return;
        }
        responseData({ res, ...result });
    } catch (error:any) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}
