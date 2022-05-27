"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = exports.RetryableError = exports.CancelledError = void 0;
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function waitRandom(min, max) {
    return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
/**
 * This error is thrown if the function is cancelled before completing
 */
class CancelledError extends Error {
    constructor() {
        super('Cancelled');
    }
}
exports.CancelledError = CancelledError;
/**
 * Throw this error if the function should retry
 */
class RetryableError extends Error {
}
exports.RetryableError = RetryableError;
/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
function retry(fn, { n, minWait, maxWait }) {
    let completed = false;
    let rejectCancelled;
    const promise = new Promise((resolve, reject) => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            rejectCancelled = reject;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                let result;
                try {
                    result = yield fn();
                    if (!completed) {
                        resolve(result);
                        completed = true;
                    }
                    break;
                }
                catch (error) {
                    if (completed) {
                        break;
                    }
                    if (n <= 0 || !(error instanceof RetryableError)) {
                        reject(error);
                        completed = true;
                        break;
                    }
                    n--;
                }
                yield waitRandom(minWait, maxWait);
            }
        }))();
    });
    return {
        promise,
        cancel: () => {
            if (completed)
                return;
            completed = true;
            rejectCancelled(new CancelledError());
        },
    };
}
exports.retry = retry;
