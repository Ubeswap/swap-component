"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const Tokens_1 = require("hooks/Tokens");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const hooks_1 = require("state/lists/hooks");
const useFetchListCallback_1 = require("../../hooks/useFetchListCallback");
const useInterval_1 = __importDefault(require("../../hooks/useInterval"));
const useIsWindowVisible_1 = __importDefault(require("../../hooks/useIsWindowVisible"));
const actions_1 = require("./actions");
// import { useActiveListUrls } from './hooks'
function Updater() {
    const library = (0, use_contractkit_1.useProvider)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const isWindowVisible = (0, useIsWindowVisible_1.default)();
    // get all loaded lists, and the active urls
    const lists = (0, hooks_1.useAllLists)();
    // const activeListUrls = useActiveListUrls()
    // initiate loading
    (0, Tokens_1.useAllInactiveTokens)();
    const fetchList = (0, useFetchListCallback_1.useFetchListCallback)();
    const fetchAllListsCallback = (0, react_1.useCallback)(() => {
        if (!isWindowVisible)
            return;
        Object.keys(lists).forEach((url) => fetchList(url).catch((error) => console.debug('interval list fetching error', error)));
    }, [fetchList, isWindowVisible, lists]);
    // fetch all lists every 10 minutes, but only after we initialize library
    (0, useInterval_1.default)(fetchAllListsCallback, library ? 1000 * 60 * 10 : null);
    // whenever a list is not loaded and not loading, try again to load it
    (0, react_1.useEffect)(() => {
        Object.keys(lists).forEach((listUrl) => {
            const list = lists[listUrl];
            if (!list.current && !list.loadingRequestId && !list.error) {
                fetchList(listUrl).catch((error) => console.debug('list added fetching error', error));
            }
        });
    }, [dispatch, fetchList, library, lists]);
    // automatically update lists if versions are minor/patch
    (0, react_1.useEffect)(() => {
        Object.keys(lists).forEach((listUrl) => {
            const list = lists[listUrl];
            if (list.pendingUpdate) {
                dispatch((0, actions_1.acceptListUpdate)(listUrl));
            }
            // TODO (bl): Figure out why this keeps breaking
            // if (list.current && list.pendingUpdate) {
            //   const bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version)
            //   switch (bump) {
            //     case VersionUpgrade.NONE:
            //       throw new Error('unexpected no version bump')
            //     case VersionUpgrade.PATCH:
            //     case VersionUpgrade.MINOR: {
            //       const min = minVersionBump(list.current.tokens, list.pendingUpdate.tokens)
            //       // automatically update minor/patch as long as bump matches the min update
            //       if (bump >= min) {
            //         dispatch(acceptListUpdate(listUrl))
            //       } else {
            //         console.error(
            //           `List at url ${listUrl} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`
            //         )
            //       }
            //       break
            //     }
            //     // update any active or inactive lists
            //     case VersionUpgrade.MAJOR:
            //       dispatch(acceptListUpdate(listUrl))
            //   }
            // }
        });
    }, [dispatch, lists]);
    return null;
}
exports.default = Updater;
