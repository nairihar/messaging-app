export interface ICustomError extends Error {
    status: number;
    message: string;
}

export type CustomErrorSchema = {
    status: number;
    message: string;
    stack: string;
};
