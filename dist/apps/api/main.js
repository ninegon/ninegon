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
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mail_module_1.MailModule,
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
        await this.mailService.sendContactUs(contact, message);
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