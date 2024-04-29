import Todo from "../models/todo";
import * as commonApi from "../helpers/common_api";
import { statusCode } from "../config/statusCode";
import { responseMessage } from "../helpers/response";
import { ServiceResult, ToDo } from "../helpers/interface";
import { ObjectId } from "mongoose";
import { verifyAccess } from "../helpers/common";
import { error,success,created,creating,getting,get,deleted,updated,todo,no_access, updating, not_found, deleting } from "../helpers/constant";

export async function createTodo(body: ToDo,user:ObjectId): Promise<ServiceResult> {
    body.user=user
    const create_todo = await commonApi.createData(body, Todo);
    if (create_todo.data) {
      return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage(success, created, todo),
        data: create_todo.data,
      };
    } else
      return {
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, creating),
        error: create_todo.error,
      };
}

export async function updateTodo(body: ToDo,id:string,user:ObjectId): Promise<ServiceResult> {
    const verify_user=await verifyAccess(user,id)
    if(!verify_user) return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(no_access),
    };
    const update_todo = await commonApi.findByIdAndUpdateData(id,body, Todo);
    if (update_todo.data) {
      return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage(success, updated, todo),
        data: update_todo.data,
      };
    } else
      return {
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(error, updating),
        error: update_todo.error,
      };
  }
  