import { PathParams } from "../types/global";

export const validateParams = (
  path: string,
  params: any
): boolean => {
  if (typeof params !== 'object') {
    return false;
  }
  if (params === null) {
    return false;
  }

  const paramSet = new Set(Object.keys(params));

  // Validate params
  const requiredParams = path
    .split("/")
    .filter((s) => s.startsWith(":"))
    .map((s) => s.substr(1));

  for (const param of requiredParams) {
    if (!paramSet.has(param)) return false;
  }

  return true;
};

// build a valid url with the path and its parameters
export const buildUrl = (
  path: string,
  params: PathParams
): string => {
  let ret: string = path;

  const paramObj = params;

  for (const key of Object.keys(paramObj)) {
    ret = ret.replace(`:${key}`, paramObj[key]);
  }

  return ret;
};
