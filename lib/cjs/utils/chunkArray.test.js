"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chunkArray_1 = __importDefault(require("./chunkArray"));
describe('#chunkArray', () => {
    it('size 1', () => {
        expect((0, chunkArray_1.default)([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });
    it('size 0 throws', () => {
        expect(() => (0, chunkArray_1.default)([1, 2, 3], 0)).toThrow('maxChunkSize must be gte 1');
    });
    it('size gte items', () => {
        expect((0, chunkArray_1.default)([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
        expect((0, chunkArray_1.default)([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
    });
    it('size exact half', () => {
        expect((0, chunkArray_1.default)([1, 2, 3, 4], 2)).toEqual([
            [1, 2],
            [3, 4],
        ]);
    });
    it('evenly distributes', () => {
        const chunked = (0, chunkArray_1.default)([...Array(100).keys()], 40);
        expect(chunked).toEqual([
            [...Array(34).keys()],
            [...Array(34).keys()].map((i) => i + 34),
            [...Array(32).keys()].map((i) => i + 68),
        ]);
        expect(chunked[0][0]).toEqual(0);
        expect(chunked[2][31]).toEqual(99);
    });
});
