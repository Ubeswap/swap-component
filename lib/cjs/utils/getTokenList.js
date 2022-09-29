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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import schema from '@uniswap/token-lists/src/tokenlist.schema.json'
// import Ajv from 'ajv'
// import addFormats from 'ajv-formats'
const uriToHttp_1 = __importDefault(require("./uriToHttp"));
// const tokenListValidator = addFormats(new Ajv({ allErrors: true })).compile(schema)
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
function getTokenList(listUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = (0, uriToHttp_1.default)(listUrl);
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const isLast = i === urls.length - 1;
            let response;
            try {
                response = yield fetch(url);
            }
            catch (error) {
                console.debug('Failed to fetch list', listUrl, error);
                if (isLast)
                    throw new Error(`Failed to download list ${listUrl}`);
                continue;
            }
            if (!response.ok) {
                if (isLast)
                    throw new Error(`Failed to download list ${listUrl}`);
                continue;
            }
            const json = yield response.json();
            // if (!tokenListValidator(json)) {
            //   const validationErrors: string =
            //     tokenListValidator.errors?.reduce<string>((memo, error) => {
            //       const add = `${error.instancePath} ${error.message ?? ''}`
            //       return memo.length > 0 ? `${memo}; ${add}` : `${add}`
            //     }, '') ?? 'unknown error'
            //   throw new Error(`Token list failed validation: ${validationErrors}`)
            // }
            return json;
        }
        throw new Error('Unrecognized list URL protocol.');
    });
}
exports.default = getTokenList;
