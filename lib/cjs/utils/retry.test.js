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
const retry_1 = require("./retry");
describe('retry', () => {
    function makeFn(fails, result, retryable = true) {
        return () => __awaiter(this, void 0, void 0, function* () {
            if (fails > 0) {
                fails--;
                throw retryable ? new retry_1.RetryableError('failure') : new Error('bad failure');
            }
            return result;
        });
    }
    it('fails for non-retryable error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, retry_1.retry)(makeFn(1, 'abc', false), { n: 3, maxWait: 0, minWait: 0 }).promise).rejects.toThrow('bad failure');
    }));
    it('works after one fail', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, retry_1.retry)(makeFn(1, 'abc'), { n: 3, maxWait: 0, minWait: 0 }).promise).resolves.toEqual('abc');
    }));
    it('works after two fails', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, retry_1.retry)(makeFn(2, 'abc'), { n: 3, maxWait: 0, minWait: 0 }).promise).resolves.toEqual('abc');
    }));
    it('throws if too many fails', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, retry_1.retry)(makeFn(4, 'abc'), { n: 3, maxWait: 0, minWait: 0 }).promise).rejects.toThrow('failure');
    }));
    it('cancel causes promise to reject', () => __awaiter(void 0, void 0, void 0, function* () {
        const { promise, cancel } = (0, retry_1.retry)(makeFn(2, 'abc'), { n: 3, minWait: 100, maxWait: 100 });
        cancel();
        yield expect(promise).rejects.toThrow('Cancelled');
    }));
    it('cancel no-op after complete', () => __awaiter(void 0, void 0, void 0, function* () {
        const { promise, cancel } = (0, retry_1.retry)(makeFn(0, 'abc'), { n: 3, minWait: 100, maxWait: 100 });
        // defer
        setTimeout(cancel, 0);
        yield expect(promise).resolves.toEqual('abc');
    }));
    function checkTime(fn, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = new Date().getTime();
            yield fn();
            const diff = new Date().getTime() - time;
            expect(diff).toBeGreaterThanOrEqual(min);
            expect(diff).toBeLessThanOrEqual(max);
        });
    }
    it('waits random amount of time between min and max', () => __awaiter(void 0, void 0, void 0, function* () {
        const promises = [];
        for (let i = 0; i < 10; i++) {
            promises.push(checkTime(() => expect((0, retry_1.retry)(makeFn(4, 'abc'), { n: 3, maxWait: 100, minWait: 50 }).promise).rejects.toThrow('failure'), 150, 400));
        }
        yield Promise.all(promises);
    }));
});
