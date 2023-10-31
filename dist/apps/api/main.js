/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const mail_module_1 = __webpack_require__(5);
const mailer_1 = __webpack_require__(7);
const path_1 = __webpack_require__(9);
const handlebars_adapter_1 = __webpack_require__(10);
const status_module_1 = __webpack_require__(11);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mail_module_1.MailModule,
            status_module_1.StatusModule,
            mailer_1.MailerModule.forRoot({
                transport: process.env.EMAIL_TRANSPORT,
                defaults: {
                    from: process.env.EMAIL_FROM,
                },
                template: {
                    dir: (0, path_1.join)(__dirname, 'assets/templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ]
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const mail_service_1 = __webpack_require__(6);
const mail_controller_1 = __webpack_require__(8);
let MailModule = exports.MailModule = class MailModule {
};
exports.MailModule = MailModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [mail_controller_1.MailController],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService]
    })
], MailModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const mailer_1 = __webpack_require__(7);
let MailService = exports.MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.sendContactUs = async (contact, message) => {
            await this.mailerService.sendMail({ to: [process.env.EMAIL_USER], subject: 'Nuevo mensaje', template: 'contactUs.hbs', context: { contact, message: message.replace(/(\r\n|\n|\r)/gm, '<br>') }, bcc: [process.env.EMAIL_USER] });
        };
    }
};
exports.MailService = MailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], MailService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailController = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const mail_service_1 = __webpack_require__(6);
let MailController = exports.MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendRequest(contact, message) {
        try {
            await this.mailService.sendContactUs(contact, message);
        }
        catch (e) {
            return e;
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('sendRequest'),
    tslib_1.__param(0, (0, common_1.Body)('contact')),
    tslib_1.__param(1, (0, common_1.Body)('message')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], MailController.prototype, "sendRequest", null);
exports.MailController = MailController = tslib_1.__decorate([
    (0, common_1.Controller)('mail'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _a : Object])
], MailController);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const status_controller_1 = __webpack_require__(12);
let StatusModule = exports.StatusModule = class StatusModule {
};
exports.StatusModule = StatusModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [status_controller_1.StatusController]
    })
], StatusModule);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusController = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const BaseController_1 = __webpack_require__(13);
var pjson = __webpack_require__(15);
let StatusController = exports.StatusController = class StatusController extends BaseController_1.BaseController {
    ping() {
        return this.returnData({
            status: 'OK',
            version: pjson.version + (process.env.NODE_ENV === 'development' ? '-dev' : ''),
            _server: {
                _date: new Date().toLocaleString('es-ES'),
                _node: process.env.NODO
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('ping'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StatusController.prototype, "ping", null);
exports.StatusController = StatusController = tslib_1.__decorate([
    (0, common_1.Controller)('status')
], StatusController);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseController = void 0;
const common_1 = __webpack_require__(4);
const express_1 = __webpack_require__(14);
class BaseController {
    constructor() {
        this.checkEmptyValue = (str) => !str || !`${str}`.trim().length;
        this.errorStatusDefault = common_1.HttpStatus.CONFLICT;
        this.errorMessageDefault = 'Unexpected internal error';
        this.error = (error, status) => {
            // protected error = (mensaje: string, T: HttpStatus = HttpStatus.NOT_FOUND) => {
            let mensaje = undefined;
            if (/^String$/.test(error.constructor.name)) {
                mensaje = error;
            }
            else if (/^(TypeError|QueryFailedError)$/.test(error.constructor.name)) {
                mensaje = error.customMessage;
            }
            else if (/^HttpException$/.test(error.constructor.name)) {
                mensaje = error['response'];
                status = error['status'];
            }
            throw new common_1.HttpException(mensaje ? mensaje : this.errorMessageDefault, status || this.errorStatusDefault);
        };
        this.returnData = (data, request, status = 200) => {
            if (!data)
                this.error('No data to return');
            if (Array.isArray(data) && !data[0])
                this.error('No data to return');
            express_1.response.status(status);
            return data;
        };
    }
}
exports.BaseController = BaseController;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ninegon/source","version":"0.24.0","license":"MIT","scripts":{"start":"nx run-many --target=serve --projects=web,api","build":"rimraf dist && nx run-many --target=build --projects=web,api --skip-nx-cache","prebuild":"npm --no-git-tag-version version minor","postbuild":"node make_version.js"},"private":true,"dependencies":{"@angular/animations":"~16.2.0","@angular/cdk":"^16.2.1","@angular/common":"~16.2.0","@angular/compiler":"~16.2.0","@angular/core":"~16.2.0","@angular/flex-layout":"^15.0.0-beta.42","@angular/forms":"~16.2.0","@angular/material":"^16.2.1","@angular/platform-browser":"~16.2.0","@angular/platform-browser-dynamic":"~16.2.0","@angular/router":"~16.2.0","@fortawesome/angular-fontawesome":"^0.13.0","@fortawesome/free-solid-svg-icons":"^6.4.2","@nestjs-modules/mailer":"^1.9.1","@nestjs/common":"^10.0.2","@nestjs/config":"^3.0.0","@nestjs/core":"^10.0.2","@nestjs/jwt":"^10.1.0","@nestjs/mapped-types":"*","@nestjs/passport":"^10.0.1","@nestjs/platform-express":"^10.2.2","@nestjs/platform-socket.io":"^10.2.2","@nestjs/schedule":"^3.0.3","@nestjs/typeorm":"^10.0.0","@nestjs/websockets":"^10.2.2","@ngrx/effects":"^16.2.0","@ngrx/store":"^16.2.0","@ngx-translate/core":"^15.0.0","@ngx-translate/http-loader":"^8.0.0","@nrwl/angular":"^16.7.4","@nrwl/nx-cloud":"^16.3.0","@nrwl/workspace":"^16.7.4","@types/date-fns":"^2.6.0","@types/jasmine":"^4.3.5","@types/pdfmake":"^0.2.2","@types/uuid":"^9.0.2","angular-animations":"^0.11.0","aos":"^2.3.4","axios":"^1.0.0","bootstrap":"^5.3.1","class-validator":"^0.14.0","crypto-js":"^4.1.1","date-fns":"^2.30.0","dotenv":"^16.3.1","file-saver":"^2.0.5","handlebars":"^4.7.8","html-pdf":"^3.0.1","jquery":"^3.7.1","jszip":"^3.10.1","moment":"^2.29.4","mysql2":"^3.6.0","ngx-cookie-service":"^16.0.1","ngx-quill":"^22.1.0","ngx-socket-io":"^4.5.1","nodemailer":"^6.9.4","passport-jwt":"^4.0.1","path":"^0.12.7","pdfmake":"^0.2.7","process":"^0.11.10","ramda":"^0.29.0","reflect-metadata":"^0.1.13","rimraf":"^5.0.1","rxjs":"^7.8.0","save-dev":"^0.0.1-security","socket.io-client":"^4.7.2","tslib":"^2.3.0","typeorm":"^0.3.17","uuid":"^9.0.0","xlsx":"^0.18.5","zone.js":"^0.13.1"},"devDependencies":{"@angular-devkit/build-angular":"~16.2.0","@angular-devkit/core":"~16.2.0","@angular-devkit/schematics":"~16.2.0","@angular-eslint/eslint-plugin":"~16.0.0","@angular-eslint/eslint-plugin-template":"~16.0.0","@angular-eslint/template-parser":"~16.0.0","@angular/cli":"~16.2.0","@angular/compiler-cli":"~16.2.0","@angular/language-service":"~16.2.0","@nestjs/schematics":"^10.0.2","@nestjs/testing":"^10.2.2","@nx/cypress":"16.10.0","@nx/eslint-plugin":"^16.7.4","@nx/jest":"16.10.0","@nx/js":"16.10.0","@nx/linter":"^16.7.4","@nx/nest":"^16.7.4","@nx/node":"^16.7.4","@nx/web":"16.10.0","@nx/webpack":"^16.7.4","@nx/workspace":"^16.7.4","@schematics/angular":"~16.2.0","@types/aos":"^3.0.4","@types/crypto-js":"^4.1.2","@types/file-saver":"^2.0.5","@types/jest":"^29.5.4","@types/multer":"^1.4.8","@types/node":"~18.7.1","@typescript-eslint/eslint-plugin":"^5.62.0","@typescript-eslint/parser":"^5.62.0","cypress":"^13.0.0","eslint":"~8.46.0","eslint-config-prettier":"^8.1.0","eslint-plugin-cypress":"^2.14.0","jest":"^29.6.4","jest-environment-jsdom":"^29.6.4","jest-environment-node":"^29.6.4","jest-preset-angular":"~13.1.0","jsonc-eslint-parser":"^2.1.0","nx":"^16.7.4","nx-cloud":"^16.3.0","prettier":"^2.8.8","ts-jest":"^29.1.1","ts-node":"^10.9.1","typescript":"~5.1.3"}}');

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const port = process.env.PORT || 3000;
    await app.listen(port);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map