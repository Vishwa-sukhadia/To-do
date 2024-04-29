export const statusCode = {
    SUCCESS: 200,
    BADREQUEST: 400,
    UNAUTHORIZED: 401,
    NOTFOUND: 404,
    CREATED: 201,
    SERVER_ERROR: 500,
    MULTI_RESPONSE: 207
} as const;

export type StatusCode = typeof statusCode;