import { IRequest } from "src/types";

export function getUserId(req: IRequest) {
  return req.userId ? Number(req.userId) : undefined;
}

export function paramToArray(param: string) {
  return param.substring(1, param.length - 1).split(",");
}

export function stringParamToNumberArray(param: string) {
  return paramToArray(param).map((i) => parseInt(i.replace(/["']/g, "")));
}
