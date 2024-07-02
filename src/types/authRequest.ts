import { User } from "@src/models/users.model";
import { Request } from "express";
import * as core from "express-serve-static-core";
import { PageData } from "./pagination";
export interface AuthRequest<
    TParams = core.ParamsDictionary,
    TResBody = any,
    TReqBody = any,
    TQuery = core.Query,
    TLocals extends Record<string, any> = Record<string, any>
> extends Request<TParams, TResBody, TReqBody, TQuery, TLocals> {
    user: User;
}

export function getPageInfo(request: Request): PageData {
    const page =
        (request.query.page as string) || (request.query.p as string) || 1;
    const limit = (request.query.limit as string) || 20;
    return {
        page: Number(page),
        limit: Number(limit),
    };
}