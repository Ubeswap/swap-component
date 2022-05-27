"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileOperatingSystem = exports.Mobile = void 0;
var Mobile;
(function (Mobile) {
    Mobile["ANDROID"] = "Android";
    Mobile["IOS"] = "iOS";
    Mobile["OTHER"] = "Other";
})(Mobile = exports.Mobile || (exports.Mobile = {}));
// Taken from https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return Mobile.OTHER;
    }
    if (/android/i.test(userAgent)) {
        return Mobile.ANDROID;
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return Mobile.IOS;
    }
    return Mobile.OTHER;
}
exports.getMobileOperatingSystem = getMobileOperatingSystem;
