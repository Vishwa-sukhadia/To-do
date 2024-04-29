import { Response } from "express";
import { ResultObject } from "./interface";
import * as constant from "./constant";

export const responseData = ({
  res,
  statusCode,
  success,
  message,
  data,
  error,
}: {
  res: Response;
  statusCode: number;
  success: number;
  message: string;
  data?: any;
  error?: any;
}): Response => {
  const resultObj: ResultObject = {
    success: success,
    message: message,
    result: data,
    error: error,
  };
  return res.status(statusCode).send(resultObj);
};

export const responseMessage = (
  response: string,
  type: string = "",
  module: string = "Data"
): string => {
  let return_message: string;
  switch (response) {
    case constant.error:
      return_message = `Error in ${type} data`;
      break;
    case constant.success:
      return_message = `${module} ${type} successfully`;
      break;
    case constant.wrong:
      return_message = `Something went wrong.`;
      break;
    case constant.not_found:
      return_message = `No such ${type} exist`;
      break;
    case constant.already_exist:
      return_message = `${type} already exist.`;
      break;
    case constant.no_access:
      return_message = `You don't have access to it.`;
      break;
    case constant.user_logged:
      return_message = "User logged successfully!";
      break;
    case constant.user_not_logged:
      return_message = "Error in user login!";
      break;
    case constant.session_expired:
      return_message = "Your session has expired";
      break;
    case constant.invalid:
      return_message = `Invalid ${type}`;
      break;
    case constant.user_exist:
      return_message = "The specified email address is already in use";
      break;
    default:
      return_message = "No message";
      break;
  }
  return return_message;
};
