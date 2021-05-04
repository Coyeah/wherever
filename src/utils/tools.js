'use strict';

import { exec } from 'child_process';

export const openUrl = (url) => {
    // process.platform 标识 Node.js 进程运行其上的操作系统平台
    switch (process.platform) {
        case 'win32': {
            exec(`start ${url}`);
            break;
        }
        case 'darwin':
        case 'linux':
        default: {
            exec(`open ${url}`);
            break;
        }
    }

}

export const tryTo = (func, result) => {
    try {
        result = func();
    } catch (e) {
    }
    return result;
}