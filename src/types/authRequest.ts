import { User } from "@src/models/users.model";
import { Request } from "express";
import * as core from "express-serve-static-core";
export interface AuthRequest<
    TParams = core.ParamsDictionary,
    TResBody = any,
    TReqBody = any,
    TQuery = core.Query,
    TLocals extends Record<string, any> = Record<string, any>
> extends Request<TParams, TResBody, TReqBody, TQuery, TLocals> {
    user: User;
}