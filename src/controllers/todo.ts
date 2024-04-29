import { Response } from "express";
import { CustomRequest } from "../helpers/interface";
import { responseData, responseMessage } from "../helpers/response";
import { statusCode } from "../config/statusCode";
import * as service from "../services/index";
import {
  error,
  creating,
  updating,
  todo,
  getting,
  deleting,
} from "../helpers/constant";

// Create Todo
export async function createTodo(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const result = await service.todoService.createTodo(
      req.body,
      req.user.data._id
    );
    if (!result) {
      responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, creating, todo),
      });
      return;
    }
    responseData({ res, ...result });
  } catch (error: any) {
    responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
}

// Update todo
export async function updateTodo(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const result = await service.todoService.updateTodo(
      req.body,
      req.params.id,
      req.user.data._id
    );
    if (!result) {
      responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, updating, todo),
      });
      return;
    }
    responseData({ res, ...result });
  } catch (error: any) {
    responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
}

// Delete todo
export async function deleteTodo(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const result = await service.todoService.deleteTodo(
      req.params.id,
      req.user.data._id
    );
    if (!result) {
      responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, deleting, todo),
      });
      return;
    }
    responseData({ res, ...result });
  } catch (error: any) {
    responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
}

// get all todo
export async function allTodo(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const result = await service.todoService.allTodo(req.user.data._id);
    if (!result) {
      responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, getting, todo),
      });
      return;
    }
    responseData({ res, ...result });
  } catch (error: any) {
    responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
}

//  Single todo details
export async function singleTodo(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const result = await service.todoService.getSingleTodo(
      req.params.id,
      req.user.data._id
    );
    if (!result) {
      responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, getting, todo),
      });
      return;
    }
    responseData({ res, ...result });
  } catch (error: any) {
    responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
}
