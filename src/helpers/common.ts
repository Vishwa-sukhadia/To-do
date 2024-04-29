import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../helpers/interface';
import {expire_time, jwt_secret_key } from '../config/config';
import { ObjectId } from "mongoose";
import Todo from "../models/todo";
import { getSingleData } from './common_api';
import { timezone } from './constant';
import moment from 'moment-timezone';


export const encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const passwordCompare = async (password: string, savedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, savedPassword);
}

export const generateToken = async (user_data: Users): Promise<string> => {
    const secret_key: string = jwt_secret_key || '';
    const expire_in: string = expire_time || '';

    const token: string = jwt.sign(
        {
            _id: user_data._id,
            email: user_data.email,
        },
        secret_key,
        {
            expiresIn: expire_in,
        },
    );
    return token;
};

export const verifyAccess = async(user:ObjectId,id:string):Promise<boolean>=>{
    const query={
        user:user,
        _id:id
    }
    const get_todo= await getSingleData(query,Todo)
    if(get_todo.data==null)  return false
    else if(get_todo.error) return false
    return true
}

export const generateRandomString=(): string=> {
    let characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id: string = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }
    return id;
}

export const currentTime=():Date=>{
    return moment.tz(timezone).toDate();
}

export const nextMid=():Date=>{
    return moment().tz(timezone).add(1, 'day').startOf('day').toDate();
}
