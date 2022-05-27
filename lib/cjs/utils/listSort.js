"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lists_1 = require("./../constants/lists");
// use ordering of default list of lists to assign priority
function sortByListPriority(urlA, urlB) {
    const first = lists_1.DEFAULT_LIST_OF_LISTS.includes(urlA) ? lists_1.DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER;
    const second = lists_1.DEFAULT_LIST_OF_LISTS.includes(urlB) ? lists_1.DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER;
    // need reverse order to make sure mapping includes top priority last
    if (first < second)
        return 1;
    else if (first > second)
        return -1;
    return 0;
}
exports.default = sortByListPriority;
