import jwt from "jsonwebtoken";
import User from "../models/user";
import { statusCode } from "../config/statusCode";
import { responseData, responseMessage } from "../helpers/response";
import { getSingleData } from "../helpers/common_api";
import { jwt_secret_key } from "../config/config";
import { CustomRequest } from "../helpers/interface";
import { Response, NextFunction } from "express";
import { session_expired } from "../helpers/constant";

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const secret = jwt_secret_key || "";
  let token: string | undefined =
    typeof req.headers.authorization === "string"
      ? req.headers.authorization
      : Array.isArray(req.headers["x-access-token"])
      ? req.headers["x-access-token"][0]
      : req.headers["x-access-token"];

  if (token) {
    token = token.startsWith("Bearer ") ? token.slice(7) : token;
  } else {
    return responseData({
      res,
      statusCode: statusCode.UNAUTHORIZED,
      success: 0,
      message: responseMessage(session_expired),
    });
  }

  jwt.verify(token, secret, async (err, decoded: any) => {
    if (!decoded || err) {
      return responseData({
        res,
        statusCode: statusCode.UNAUTHORIZED,
        success: 0,
        message: responseMessage(session_expired),
      });
    }

    try {
      const users = await getSingleData({ _id: decoded._id }, User);
      if (!users.data) {
        return responseData({
          res,
          statusCode: statusCode.UNAUTHORIZED,
          success: 0,
          message: responseMessage(session_expired),
        });
      }
      delete users.data._doc.password;
      req.user = users;
      next();
    } catch (error) {
      return responseData({
        res,
        statusCode: statusCode.UNAUTHORIZED,
        success: 0,
        message: responseMessage(session_expired),
      });
    }
  });
};

export default verifyToken;
