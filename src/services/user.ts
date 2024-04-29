import User from "../models/user";
import * as commonApi from "../helpers/common_api";
import { statusCode } from "../config/statusCode";
import { responseMessage } from "../helpers/response";
import * as common from "../helpers/common";
import { ServiceResult, Users } from "../helpers/interface";
import {
  error,
  success,
  created,
  user,
  creating,
  getting,
  invalid,
  user_logged,
} from "../helpers/constant";

export async function createUser(body: Users): Promise<ServiceResult> {
  body.password = await common.encryptPassword(body.password);
  const create_user = await commonApi.createData(body, User);
  if (create_user.data) {
    delete create_user.data._doc.password;
    return {
      statusCode: statusCode.SUCCESS,
      success: 1,
      message: responseMessage(success, created, user),
      data: create_user.data,
    };
  } else
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(error, creating),
      error: create_user.error,
    };
}

export async function login(body: Users): Promise<ServiceResult> {
  const query = { email: body.email };
  const user_data = await commonApi.getSingleData(query, User);
  if (user_data.error)
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(error, getting),
      error: user_data.error,
    };
  if (user_data.data == null)
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: responseMessage(invalid, "Email"),
    };
  const password_match = await common.passwordCompare(
    body.password,
    user_data.data.password
  );
  if (password_match == false)
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: responseMessage(invalid, "Password"),
    };
  const token = await common.generateToken(user_data.data);
  delete user_data.data._doc.password;
  user_data.data.set("token", token, { strict: false });
  return {
    statusCode: statusCode.SUCCESS,
    success: 1,
    message: responseMessage(user_logged),
    data: user_data.data,
  };
}
