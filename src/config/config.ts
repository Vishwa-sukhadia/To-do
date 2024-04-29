import {config} from "dotenv";
config();

export const jwt_secret_key: string | undefined = process.env.SECRET_KEY;
export const db_conn_string:string | undefined=process.env.DB_CON_STRING
export const listen_port:string | undefined=process.env.PORT
export const expire_time:string | undefined=process.env.EXPIRE_TIME

