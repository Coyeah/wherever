"use strict";

import path from "path";
import { readFileSync } from "fs";
import { exec } from "child_process";

import { CWD } from "../common/config";

export const openUrl = (url) => {
  // process.platform 标识 Node.js 进程运行其上的操作系统平台
  switch (process.platform) {
    case "win32": {
      exec(`start ${url}`);
      break;
    }
    case "darwin":
    case "linux":
    default: {
      exec(`open ${url}`);
      break;
    }
  }
};

export const tryTo = (func, result) => {
  try {
    const r = func();
    if (r !== null && r !== undefined) {
      result = r;
    }
  } catch (e) { }
  return result;
};

export const readJsonFile = (ownPath) => {
  if (!ownPath) return {};
  const target = path.resolve(CWD, ownPath);
  return tryTo(() => JSON.parse(readFileSync(target, "utf-8")), {});
}