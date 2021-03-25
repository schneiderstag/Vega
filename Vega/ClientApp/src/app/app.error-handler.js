"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorHandler = void 0;
var AppErrorHandler = /** @class */ (function () {
    function AppErrorHandler(notificationService) {
        this.notificationService = notificationService;
    }
    AppErrorHandler.prototype.handleError = function (error) {
        console.log("Error!");
        this.notificationService.showToastr('error', 'Error', 'An unexpected error happened.');
    };
    return AppErrorHandler;
}());
exports.AppErrorHandler = AppErrorHandler;
//# sourceMappingURL=app.error-handler.js.map