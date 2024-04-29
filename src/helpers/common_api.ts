import { Document, Model,FilterQuery } from 'mongoose';
import { responseMessage } from "./response";
import { Query,AdditionalQuery,Response } from './interface';
import { wrong } from './constant';

export const getAllData = async <T extends Document>(
    query: Query,
    model: any,
    additional: AdditionalQuery[] = []
): Promise<Response> => {
    let getData = model.find(query as any);

    if (additional.length > 0) {
        for (const item of additional) {
            const method = Object.keys(item)[0] as keyof Model<T>;
            const arg = Object.values(item)[0];
            getData = (getData as any)[method](arg);
        }
    }

    try {
        const result = await getData.exec();
        return { data: result };
    } catch (error) {
        return { error: error };
    }
};

export const getSingleData = async <T extends Document>(
    query: Query,
    model: any,
    additional: AdditionalQuery[] = []
): Promise<Response> => {
    let getSingleData = model.findOne(query as any);

    if (additional.length > 0) {
        for (const item of additional) {
            const method = Object.keys(item)[0] as keyof Model<T>;
            const arg = Object.values(item)[0];
            getSingleData = (getSingleData as any)[method](arg);
        }
    }

    try {
        const result = await getSingleData.exec();
        return { data: result };
    } catch (error) {
        return { error: error };
    }
};

export const createData = async <T extends Document>(
    body: any,
    model: any
): Promise<Response> => {
    const createData = new model(body);

    try {
        await createData.save();
        return { data: createData };
    } catch (error:any) {
        if (error.name === "ValidationError") {
            let errors: any = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });
            return { error: errors };
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            return { error: responseMessage("already_exist", Object.keys(error.keyValue).join(', ')) };
        }
        return { error: responseMessage(wrong) };
    }
};

export const findOneAndUpdateData = async <T extends Document>(
    query: Query,
    body: any,
    model:any,
    additional: AdditionalQuery[] = []
): Promise<Response> => {
    let updatedData = model.findOneAndUpdate(query as any, body, { new: true });

    if (additional.length > 0) {
        for (const item of additional) {
            const method = Object.keys(item)[0] as keyof Model<T>;
            const arg = Object.values(item)[0];
            updatedData = (updatedData as any)[method](arg);
        }
    }

    try {
        const result = await updatedData.exec();
        return { data: result };
    } catch (error:any) {
        if (error.name === "ValidationError") {
            let errors: any = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });
            return { error: errors };
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            return { error: responseMessage("already_exist", Object.keys(error.keyValue).join(', ')) };
        }
        return { error: responseMessage(wrong) };
    }
};

export const findByIdAndUpdateData = async <T extends Document>(
    query: string,
    body: any,
    model: any,
    additional: AdditionalQuery[] = []
): Promise<Response> => {
    let updatedData = model.findByIdAndUpdate(query, body, { new: true });

    if (additional.length > 0) {
        for (const item of additional) {
            const method = Object.keys(item)[0] as keyof Model<T>;
            const arg = Object.values(item)[0];
            updatedData = (updatedData as any)[method](arg);
        }
    }

    try {
        const result = await updatedData.exec();
        return { data: result };
    } catch (error:any) {
        if (error.name === "ValidationError") {
            let errors: any = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });
            return { error: errors };
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            return { error: responseMessage("already_exist", Object.keys(error.keyValue).join(', ')) };
        }
        return { error: responseMessage(wrong) };
    }
};

export const deleteSingleData = async <T extends Document>(
    query: Query,
    model: any
): Promise<Response> => {
    const deletedData = await model.deleteOne(query as any);

    try {
        return { data: deletedData };
    } catch (error) {
        return { error: error };
    }
};


export const bulkUpdate = async <T extends Document>(
    query:FilterQuery<T>,
    body: any,
    model: any
): Promise<Response> => {
    const updateData = await model.updateMany(query,body);

    try {
        return { data: updateData };
    } catch (error:any) {
        if (error.name === "ValidationError") {
            let errors: any = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });
            return { error: errors };
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            return { error: responseMessage("already_exist", Object.keys(error.keyValue).join(', ')) };
        }
        return { error: responseMessage(wrong) };
    }
};



