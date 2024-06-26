import Todo from "../models/todo";
import * as commonApi from "../helpers/common_api";
import { statusCode } from "../config/statusCode";
import { responseMessage } from "../helpers/response";
import { ServiceResult, ToDo } from "../helpers/interface";
import { ObjectId } from "mongoose";
import { verifyAccess } from "../helpers/common";
import {
  error,
  success,
  created,
  creating,
  getting,
  get,
  deleted,
  updated,
  todo,
  no_access,
  updating,
  not_found,
  deleting,
} from "../helpers/constant";

export async function createTodo(
  body: ToDo,
  user: ObjectId
): Promise<ServiceResult> {
  body.user = user;
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

export async function updateTodo(
  body: ToDo,
  id: string,
  user: ObjectId
): Promise<ServiceResult> {
  const verify_user = await verifyAccess(user, id);
  if (!verify_user)
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(no_access),
    };
  const update_todo = await commonApi.findByIdAndUpdateData(id, body, Todo);
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

export async function deleteTodo(
  id: string,
  user: ObjectId
): Promise<ServiceResult> {
  const verify_user = await verifyAccess(user, id);
  if (!verify_user)
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(no_access),
    };
  const delete_todo = await commonApi.deleteSingleData({ _id: id }, Todo);
  if (delete_todo.data.deletedCount == 1) {
    return {
      statusCode: statusCode.SUCCESS,
      success: 1,
      message: responseMessage(success, deleted, todo),
    };
  } else if (delete_todo.data.deletedCount == 0) {
    return {
      statusCode: statusCode.NOTFOUND,
      success: 1,
      message: responseMessage(not_found, todo),
    };
  } else
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(error, deleting),
      error: delete_todo.error,
    };
}

export async function allTodo(user: ObjectId): Promise<ServiceResult> {
  const query = {
    user: user,
  };
  const additional = [{ populate: { path: "user", select: ["email"] } }];
  const all_todo = await commonApi.getAllData(query, Todo, additional);
  if (all_todo.data) {
    return {
      statusCode: statusCode.SUCCESS,
      success: 1,
      message: responseMessage(success, get, todo),
      data: all_todo.data,
    };
  } else
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(error, getting),
      error: all_todo.error,
    };
}

export async function getSingleTodo(
  id: string,
  user: ObjectId
): Promise<ServiceResult> {
  const additional = [{ populate: { path: "user", select: ["email"] } }];
  const todo_data = await commonApi.getSingleData(
    { _id: id },
    Todo,
    additional
  );
  if (todo_data.data) {
    const verify_user = await verifyAccess(user, id);
    if (!verify_user)
      return {
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage(no_access),
      };
    return {
      statusCode: statusCode.SUCCESS,
      success: 1,
      message: responseMessage(success, get, todo),
      data: todo_data.data,
    };
  } else if (todo_data.data == null) {
    return {
      statusCode: statusCode.NOTFOUND,
      success: 1,
      message: responseMessage(not_found, todo),
    };
  } else
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage(error, getting),
      error: todo_data.error,
    };
}

export async function updateTodoStatus(): Promise<void> {
  const get_all_todo = await commonApi.getAllData({}, Todo);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const update_status = { completed: true };
  const query = { dueDate: { $lt: today } };
  if (get_all_todo.data.length > 0)
    commonApi.bulkUpdate(query, update_status, Todo);
}
