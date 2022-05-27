var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useProvider } from '@celo-tools/use-contractkit';
import { useEffect, useState } from 'react';
export function useTimestampFromBlock(block) {
    const library = useProvider();
    const [timestamp, setTimestamp] = useState();
    useEffect(() => {
        function fetchTimestamp() {
            return __awaiter(this, void 0, void 0, function* () {
                if (block) {
                    const blockData = yield (library === null || library === void 0 ? void 0 : library.getBlock(block));
                    blockData && setTimestamp(blockData.timestamp);
                }
            });
        }
        if (!timestamp) {
            fetchTimestamp();
        }
    }, [block, library, timestamp]);
    return timestamp;
}
