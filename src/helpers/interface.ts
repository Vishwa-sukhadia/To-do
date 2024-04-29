import mongoose from "mongoose";
import { Request as ExpressRequest } from 'express';


export interface Users {
  _id?: string;
  email: string;
  password: string;
}


export interface Query {
  [key: string]: any;
}

export interface AdditionalQuery {
  [key: string]: any;
}

export interface CustomRequest extends ExpressRequest {
    user?: any; 
}

export interface Response {
  data?: any;
  error?: any;
}

export interface ResultObject {
  success: number;
  message: string;
  result?: any;
  error?: any;
}

export interface ServiceResult {
  statusCode: number;
  success: number;
  message: string;
  data?: any;
  error?: any;
}
