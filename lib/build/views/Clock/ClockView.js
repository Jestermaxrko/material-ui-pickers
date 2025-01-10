"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Clock_1 = __importDefault(require("./Clock"));
var ClockType_1 = __importDefault(require("../../constants/ClockType"));
var useUtils_1 = require("../../_shared/hooks/useUtils");
var ClockNumbers_1 = require("./ClockNumbers");
var time_utils_1 = require("../../_helpers/time-utils");
var defProps = {
    ampm: true,
    minutesStep: 1,
};
exports.ClockView = function (_a) {
    var type = _a.type, onHourChange = _a.onHourChange, onMinutesChange = _a.onMinutesChange, onSecondsChange = _a.onSecondsChange, _b = _a.ampm, ampm = _b === void 0 ? defProps.ampm : _b, date = _a.date, _c = _a.minutesStep, minutesStep = _c === void 0 ? defProps.minutesStep : _c;
    var utils = useUtils_1.useUtils();
    var viewProps = React.useMemo(function () {
        switch (type) {
            case ClockType_1.default.HOURS:
                return {
                    value: utils.getHours(date),
                    children: ClockNumbers_1.getHourNumbers({ date: date, utils: utils, ampm: Boolean(ampm) }),
                    onChange: function (value, isFinish) {
                        var currentMeridiem = time_utils_1.getMeridiem(date, utils);
                        var updatedTimeWithMeridiem = time_utils_1.convertToMeridiem(utils.setHours(date, value), currentMeridiem, Boolean(ampm), utils);
                        onHourChange(updatedTimeWithMeridiem, isFinish);
                    },
                };
            case ClockType_1.default.MINUTES:
                var minutesValue = utils.getMinutes(date);
                return {
                    value: minutesValue,
                    children: ClockNumbers_1.getMinutesNumbers({ value: minutesValue, utils: utils }),
                    onChange: function (value, isFinish) {
                        var updatedTime = utils.setMinutes(date, value);
                        onMinutesChange(updatedTime, isFinish);
                    },
                };
            case ClockType_1.default.SECONDS:
                var secondsValue = utils.getSeconds(date);
                return {
                    value: secondsValue,
                    children: ClockNumbers_1.getMinutesNumbers({ value: secondsValue, utils: utils }),
                    onChange: function (value, isFinish) {
                        var updatedTime = utils.setSeconds(date, value);
                        onSecondsChange(updatedTime, isFinish);
                    },
                };
            default:
                throw new Error('You must provide the type for TimePickerView');
        }
    }, [ampm, date, onHourChange, onMinutesChange, onSecondsChange, type, utils]);
    return React.createElement(Clock_1.default, __assign({ type: type, ampm: ampm, minutesStep: minutesStep }, viewProps));
};
exports.ClockView.displayName = 'TimePickerView';
exports.default = React.memo(exports.ClockView);
