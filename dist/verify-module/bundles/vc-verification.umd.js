(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('jszip'), require('@zxing/ngx-scanner')) :
    typeof define === 'function' && define.amd ? define('vc-verification', ['exports', '@angular/core', '@angular/common', 'jszip', '@zxing/ngx-scanner'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vc-verification'] = {}, global.ng.core, global.ng.common, global.JSZip, global.i3));
}(this, (function (exports, i0, i2, JSZip, i3) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) { return e; } else {
            var n = Object.create(null);
            if (e) {
                Object.keys(e).forEach(function (k) {
                    if (k !== 'default') {
                        var d = Object.getOwnPropertyDescriptor(e, k);
                        Object.defineProperty(n, k, d.get ? d : {
                            enumerable: true,
                            get: function () {
                                return e[k];
                            }
                        });
                    }
                });
            }
            n['default'] = e;
            return Object.freeze(n);
        }
    }

    var JSZip__namespace = /*#__PURE__*/_interopNamespace(JSZip);

    var VerifyLibraryService = /** @class */ (function () {
        function VerifyLibraryService(config) {
            this.config = config;
            this.configData = config;
        }
        return VerifyLibraryService;
    }());
    VerifyLibraryService.ɵfac = function VerifyLibraryService_Factory(t) { return new (t || VerifyLibraryService)(i0.ɵɵinject("vcConfig", 8)); };
    VerifyLibraryService.ɵprov = i0.ɵɵdefineInjectable({ token: VerifyLibraryService, factory: VerifyLibraryService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(VerifyLibraryService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: ["vcConfig"]
                        }] }];
        }, null);
    })();

    var VerifyModuleComponent = /** @class */ (function () {
        function VerifyModuleComponent() {
        }
        VerifyModuleComponent.prototype.ngOnInit = function () {
            alert('hi this Vc Verify Lib');
        };
        return VerifyModuleComponent;
    }());
    VerifyModuleComponent.ɵfac = function VerifyModuleComponent_Factory(t) { return new (t || VerifyModuleComponent)(); };
    VerifyModuleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: VerifyModuleComponent, selectors: [["lib-verify-module"]], decls: 2, vars: 0, template: function VerifyModuleComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "p");
                i0.ɵɵtext(1, " verify-module works! ");
                i0.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(VerifyModuleComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-verify-module',
                        template: "\n    <p>\n      verify-module works!\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return []; }, null);
    })();

    var ConfigService = /** @class */ (function () {
        function ConfigService(verifyLibraryService) {
            this.verifyLibraryService = verifyLibraryService;
        }
        ConfigService.prototype.getConfigUrl = function () {
            return this.verifyLibraryService.configData;
        };
        return ConfigService;
    }());
    ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(i0.ɵɵinject(VerifyLibraryService)); };
    ConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ConfigService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: VerifyLibraryService }]; }, null);
    })();

    var VerifyService = /** @class */ (function () {
        function VerifyService(configService) {
            this.configService = configService;
            this.scannerEnabled = false;
            this.success = false;
            this.loader = false;
            this.notValid = false;
            this.items = [];
            this.document = [];
            this.excludedFields = ['osid', 'id', 'type', 'fileUrl', 'otp', 'transactionId'];
        }
        VerifyService.prototype.ngOnInit = function () {
        };
        VerifyService.prototype.enableScanner = function () {
            this.success = false;
            this.scannerEnabled = !this.scannerEnabled;
        };
        VerifyService.prototype.scanSuccessHandler = function ($event) {
            var _this = this;
            this.configData = this.configService.getConfigUrl();
            return new Promise(function (resolve, reject) {
                _this.items = [];
                _this.qrString = $event;
                var CERTIFICATE_FILE = "certificate.json";
                var zip = new JSZip__namespace();
                zip.loadAsync($event).then(function (contents) {
                    return contents.files[CERTIFICATE_FILE].async('text');
                }).then(function (contents) {
                    _this.loader = true;
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Cookie", "JSESSIONID=BEE076F2D0801811396549DCC158F429; OAuth_Token_Request_State=1ef52fae-6e1a-4395-af75-beb03e9f8bc3");
                    var signedData = JSON.parse(contents);
                    _this.readData(signedData.credentialSubject);
                    var context = { signedData: signedData };
                    //  context['signedCredentials'] = signedData
                    var raw = JSON.stringify(context);
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                    fetch(_this.configData.baseUrl + "/verify", requestOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (result) {
                        if (result.verified) {
                            _this.loader = false;
                            _this.success = true;
                            _this.scannerEnabled = false;
                        }
                        else {
                            _this.loader = false;
                            _this.scannerEnabled = false;
                            _this.notValid = true;
                            //this.enableScanner()
                        }
                        console.log('result --- ', result.results[0]);
                        result.results[0]['signedCredentials'] = signedData.credentialSubject;
                        resolve(result);
                    })
                        .catch(function (error) {
                        console.log('error', error);
                        reject(error);
                    });
                }).catch(function (err) {
                    console.log('err', err);
                    reject(err);
                });
            });
        };
        VerifyService.prototype.readData = function (res) {
            this.item = [];
            var _self = this;
            Object.keys(res).forEach(function (key) {
                var tempObject = {};
                if (!_self.excludedFields.includes(key)) {
                    tempObject['title'] = (key).charAt(0).toUpperCase() + key.slice(1);
                    ;
                    tempObject['value'] = res[key];
                    console.log(tempObject);
                    _self.items.push(tempObject);
                }
            });
        };
        return VerifyService;
    }());
    VerifyService.ɵfac = function VerifyService_Factory(t) { return new (t || VerifyService)(i0.ɵɵinject(ConfigService)); };
    VerifyService.ɵprov = i0.ɵɵdefineInjectable({ token: VerifyService, factory: VerifyService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(VerifyService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: ConfigService }]; }, null);
    })();

    function ScanVcComponent_div_2_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r4.item == null ? null : ctx_r4.item.verify_certificate);
        }
    }
    function ScanVcComponent_div_2_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "Verify Certificate");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_2_button_5_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r9.item == null ? null : ctx_r9.item.scan_qrcode);
        }
    }
    function ScanVcComponent_div_2_button_5_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "Scan QR Code");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_2_button_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 11);
            i0.ɵɵlistener("click", function ScanVcComponent_div_2_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12_1); var ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.openScanner(); });
            i0.ɵɵelement(1, "i", 12);
            i0.ɵɵtext(2, " \u00A0 ");
            i0.ɵɵelementStart(3, "span", 13);
            i0.ɵɵtemplate(4, ScanVcComponent_div_2_button_5_span_4_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(5, ScanVcComponent_div_2_button_5_span_5_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx_r6.item == null ? null : ctx_r6.item.scan_qrcode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r6.item == null ? null : ctx_r6.item.scan_qrcode));
        }
    }
    function ScanVcComponent_div_2_span_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r7 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", ctx_r7.item == null ? null : ctx_r7.item.scanNote, "");
        }
    }
    function ScanVcComponent_div_2_span_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "To verify any eLocker document, simply scan the QR code thats on the document.");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "img", 6);
            i0.ɵɵelementStart(2, "h3", 7);
            i0.ɵɵtemplate(3, ScanVcComponent_div_2_span_3_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(4, ScanVcComponent_div_2_span_4_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, ScanVcComponent_div_2_button_5_Template, 6, 2, "button", 8);
            i0.ɵɵelementStart(6, "div", 9);
            i0.ɵɵelementStart(7, "p", 10);
            i0.ɵɵtemplate(8, ScanVcComponent_div_2_span_8_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(9, ScanVcComponent_div_2_span_9_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r0.item == null ? null : ctx_r0.item.verify_certificate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r0.item == null ? null : ctx_r0.item.verify_certificate));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r0.verifyService == null ? null : ctx_r0.verifyService.scannerEnabled) && !(ctx_r0.verifyService == null ? null : ctx_r0.verifyService.success));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r0.item == null ? null : ctx_r0.item.scanNote);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r0.item == null ? null : ctx_r0.item.scanNote));
        }
    }
    function ScanVcComponent_div_3_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 21);
        }
    }
    function ScanVcComponent_div_3_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 22);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r14 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r14.item == null ? null : ctx_r14.item.scan_qrcode);
        }
    }
    function ScanVcComponent_div_3_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 22);
            i0.ɵɵtext(1, "Scan QR Code");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_3_div_8_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 26);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r19 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r19.item == null ? null : ctx_r19.item.detecting_qrcode);
        }
    }
    function ScanVcComponent_div_3_div_8_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 26);
            i0.ɵɵtext(1, "Detecting QR code");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_3_div_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 23);
            i0.ɵɵelementStart(1, "div", 24);
            i0.ɵɵtemplate(2, ScanVcComponent_div_3_div_8_span_2_Template, 2, 1, "span", 25);
            i0.ɵɵtemplate(3, ScanVcComponent_div_3_div_8_span_3_Template, 2, 0, "span", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r17 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r17.item == null ? null : ctx_r17.item.detecting_qrcode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r17.item == null ? null : ctx_r17.item.detecting_qrcode));
        }
    }
    function ScanVcComponent_div_3_button_9_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 13);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r21 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r21.item == null ? null : ctx_r21.item.back);
        }
    }
    function ScanVcComponent_div_3_button_9_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 13);
            i0.ɵɵtext(1, "Back");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_3_button_9_Template(rf, ctx) {
        if (rf & 1) {
            var _r24_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 27);
            i0.ɵɵlistener("click", function ScanVcComponent_div_3_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24_1); var ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.openScanner(); });
            i0.ɵɵtemplate(1, ScanVcComponent_div_3_button_9_span_1_Template, 2, 1, "span", 28);
            i0.ɵɵtemplate(2, ScanVcComponent_div_3_button_9_span_2_Template, 2, 0, "span", 28);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r18 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r18.item == null ? null : ctx_r18.item.back);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r18.item == null ? null : ctx_r18.item.back));
        }
    }
    function ScanVcComponent_div_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r26_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 14);
            i0.ɵɵtemplate(1, ScanVcComponent_div_3_div_1_Template, 1, 0, "div", 15);
            i0.ɵɵtemplate(2, ScanVcComponent_div_3_span_2_Template, 2, 1, "span", 16);
            i0.ɵɵtemplate(3, ScanVcComponent_div_3_span_3_Template, 2, 0, "span", 16);
            i0.ɵɵelement(4, "br");
            i0.ɵɵelement(5, "br");
            i0.ɵɵelementStart(6, "zxing-scanner", 17, 18);
            i0.ɵɵlistener("scanSuccess", function ScanVcComponent_div_3_Template_zxing_scanner_scanSuccess_6_listener($event) { i0.ɵɵrestoreView(_r26_1); var ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.scanHandler($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, ScanVcComponent_div_3_div_8_Template, 4, 2, "div", 19);
            i0.ɵɵtemplate(9, ScanVcComponent_div_3_button_9_Template, 3, 2, "button", 20);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.verifyService == null ? null : ctx_r1.verifyService.loader);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.item == null ? null : ctx_r1.item.scan_qrcode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r1.item == null ? null : ctx_r1.item.scan_qrcode));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx_r1.verifyService == null ? null : ctx_r1.verifyService.loader);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.verifyService == null ? null : ctx_r1.verifyService.scannerEnabled);
        }
    }
    function ScanVcComponent_div_5_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r27 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r27.item == null ? null : ctx_r27.item.certificate_isverified);
        }
    }
    function ScanVcComponent_div_5_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, " Certificate is verified");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_5_span_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r29 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r29.item == null ? null : ctx_r29.item.verifycertificate);
        }
    }
    function ScanVcComponent_div_5_span_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "Scan QR Code");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_5_tr_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "tr");
            i0.ɵɵelementStart(1, "td", 35);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "td", 35);
            i0.ɵɵelementStart(4, "b");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r35 = ctx.$implicit;
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(item_r35 == null ? null : item_r35.title);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(item_r35 == null ? null : item_r35.value);
        }
    }
    function ScanVcComponent_div_5_span_13_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 13);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r32 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r32.item == null ? null : ctx_r32.item.verify_another_Certificate);
        }
    }
    function ScanVcComponent_div_5_span_14_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 13);
            i0.ɵɵtext(1, "Scan QR Code");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_5_h7_15_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r36 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r36.item == null ? null : ctx_r36.item.cetificate_not_valid);
        }
    }
    function ScanVcComponent_div_5_h7_15_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "This Certificate is not valid");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_div_5_h7_15_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "h7", 36);
            i0.ɵɵelement(1, "i", 37);
            i0.ɵɵtemplate(2, ScanVcComponent_div_5_h7_15_span_2_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(3, ScanVcComponent_div_5_h7_15_span_3_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r34 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r34.item == null ? null : ctx_r34.item.cetificate_not_valid);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r34.item == null ? null : ctx_r34.item.cetificate_not_valid));
        }
    }
    function ScanVcComponent_div_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r39_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 29);
            i0.ɵɵelement(1, "img", 30);
            i0.ɵɵelementStart(2, "h3", 31);
            i0.ɵɵtemplate(3, ScanVcComponent_div_5_span_3_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(4, ScanVcComponent_div_5_span_4_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 32);
            i0.ɵɵelementStart(6, "h4");
            i0.ɵɵtext(7, " Vaccination Certificate ");
            i0.ɵɵtemplate(8, ScanVcComponent_div_5_span_8_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(9, ScanVcComponent_div_5_span_9_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "table");
            i0.ɵɵtemplate(11, ScanVcComponent_div_5_tr_11_Template, 6, 2, "tr", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 34);
            i0.ɵɵlistener("click", function ScanVcComponent_div_5_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r39_1); var ctx_r38 = i0.ɵɵnextContext(); return ctx_r38.openScanner(); });
            i0.ɵɵtemplate(13, ScanVcComponent_div_5_span_13_Template, 2, 1, "span", 28);
            i0.ɵɵtemplate(14, ScanVcComponent_div_5_span_14_Template, 2, 0, "span", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(15, ScanVcComponent_div_5_h7_15_Template, 4, 2, "h7", 5);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r2.item == null ? null : ctx_r2.item.certificate_isverified);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r2.item == null ? null : ctx_r2.item.certificate_isverified));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !(ctx_r2.item == null ? null : ctx_r2.item.verifycertificate));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.item == null ? null : ctx_r2.item.verifycertificate);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r2.verifyService == null ? null : ctx_r2.verifyService.items);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r2.item == null ? null : ctx_r2.item.verify_another_Certificate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r2.item == null ? null : ctx_r2.item.verify_another_Certificate));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r2.verifyService == null ? null : ctx_r2.verifyService.scannerEnabled) && (ctx_r2.verifyService == null ? null : ctx_r2.verifyService.notValid));
        }
    }
    function ScanVcComponent_h7_6_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r40 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r40.item == null ? null : ctx_r40.item.cetificate_not_valid);
        }
    }
    function ScanVcComponent_h7_6_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "This Certificate is not valid");
            i0.ɵɵelementEnd();
        }
    }
    function ScanVcComponent_h7_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "h7", 36);
            i0.ɵɵelement(1, "i", 37);
            i0.ɵɵtemplate(2, ScanVcComponent_h7_6_span_2_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(3, ScanVcComponent_h7_6_span_3_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r3.item == null ? null : ctx_r3.item.cetificate_not_valid);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !(ctx_r3.item == null ? null : ctx_r3.item.cetificate_not_valid));
        }
    }
    var ScanVcComponent = /** @class */ (function () {
        function ScanVcComponent(verifyService) {
            this.verifyService = verifyService;
        }
        ScanVcComponent.prototype.ngOnInit = function () {
            /* {
              verify_certificate = 'Verify Certificate',
             scan_qrcode = 'Scan QR Code'
              detecting_qrcode = 'Detecting QR code'
              back = 'Back'
              certificate_isverified = 'Certificate is verified'
              verify_another_Certificate = 'Verify another Certificate'
              cetificate_not_valid = 'This Certificate is not valid'
              }*/
        };
        ScanVcComponent.prototype.scanHandler = function ($event) {
            this.verifyService.scanSuccessHandler($event);
        };
        ScanVcComponent.prototype.openScanner = function () {
            console.log(this.item);
            this.verifyService.enableScanner();
        };
        return ScanVcComponent;
    }());
    ScanVcComponent.ɵfac = function ScanVcComponent_Factory(t) { return new (t || ScanVcComponent)(i0.ɵɵdirectiveInject(VerifyService)); };
    ScanVcComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ScanVcComponent, selectors: [["lib-scan-vc"]], inputs: { item: "item" }, decls: 7, vars: 4, consts: [[1, "h-25", "mt-50", "text-capitalize"], [1, "h-25", "mt-5", 2, "text-align", "-webkit-center"], [4, "ngIf"], ["id", "vcSpinner", 4, "ngIf"], ["class", "align-center", 4, "ngIf"], ["style", "color: red", 4, "ngIf"], ["src", "data:image/png;base64,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", 2, "height", "150px"], [1, "vc-textStyle"], ["type", "button", "class", "btn vc-btnPrimary vc-scanBtn", 3, "click", 4, "ngIf"], [1, "vc-msg"], [1, "p12"], ["type", "button", 1, "btn", "vc-btnPrimary", "vc-scanBtn", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-qrcode", "vc-whiteColor", "vc-faIcon"], [1, "vc-whiteColor", "p16"], ["id", "vcSpinner"], ["class", "vc-loader", 4, "ngIf"], ["class", "p18", 4, "ngIf"], [2, "width", "50%", 3, "scanSuccess"], ["scanner", ""], ["class", "d-flex justify-content-center", 4, "ngIf"], ["type", "button", "class", "btn vc-btnPrimary mt-50", 3, "click", 4, "ngIf"], [1, "vc-loader"], [1, "p18"], [1, "d-flex", "justify-content-center"], ["role", "status", 1, "spinner-border"], ["class", "vc-itText p14", 4, "ngIf"], [1, "vc-itText", "p14"], ["type", "button", 1, "btn", "vc-btnPrimary", "mt-50", 3, "click"], ["class", "vc-whiteColor p16", 4, "ngIf"], [1, "align-center"], ["src", "data:image/png;base64,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", 2, "height", "50px"], [1, "mt-3"], [1, "vc-cardL"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "vc-btnPrimary", "mt-25", 3, "click"], ["width", "50%", "valign", "top"], [2, "color", "red"], ["aria-hidden", "true", 1, "fa", "fa-times", "btn-error", "m-2"]], template: function ScanVcComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵtemplate(2, ScanVcComponent_div_2_Template, 10, 5, "div", 2);
                i0.ɵɵtemplate(3, ScanVcComponent_div_3_Template, 10, 5, "div", 3);
                i0.ɵɵelement(4, "br");
                i0.ɵɵtemplate(5, ScanVcComponent_div_5_Template, 16, 8, "div", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(6, ScanVcComponent_h7_6_Template, 4, 2, "h7", 5);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !(ctx.verifyService == null ? null : ctx.verifyService.scannerEnabled) && !(ctx.verifyService == null ? null : ctx.verifyService.success));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.verifyService == null ? null : ctx.verifyService.scannerEnabled);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !(ctx.verifyService == null ? null : ctx.verifyService.scannerEnabled) && (ctx.verifyService == null ? null : ctx.verifyService.success));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !(ctx.verifyService == null ? null : ctx.verifyService.scannerEnabled) && (ctx.verifyService == null ? null : ctx.verifyService.notValid));
            }
        }, directives: [i2.NgIf, i3.ZXingScannerComponent, i2.NgForOf], styles: [".vc-textStyle[_ngcontent-%COMP%]{font-size:14px;font-weight:700;letter-spacing:0;line-height:32px;text-align:center}.vc-whiteColor[_ngcontent-%COMP%]{color:#fff}.vc-faIcon[_ngcontent-%COMP%]{font-size:18px}.p16[_ngcontent-%COMP%], .vc-faIcon[_ngcontent-%COMP%]{letter-spacing:0;text-align:center}.p16[_ngcontent-%COMP%]{font-size:16px;font-weight:700}.p12[_ngcontent-%COMP%]{font-size:12px;font-weight:400;letter-spacing:0;line-height:24px;text-align:left}.p14[_ngcontent-%COMP%]{font-size:14px;letter-spacing:0}.p14[_ngcontent-%COMP%], .p18[_ngcontent-%COMP%]{font-weight:700;text-align:center}.p18[_ngcontent-%COMP%]{color:#000;font-size:18px}h3[_ngcontent-%COMP%]{font-size:24px;line-height:32px}h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%]{font-weight:700;letter-spacing:0;text-align:center}h4[_ngcontent-%COMP%]{font-size:16px;line-height:24px}.vc-itText[_ngcontent-%COMP%]{font-size:18px;font-style:italic;font-weight:400;letter-spacing:0;line-height:22px;text-align:center}.vc-scanBtn[_ngcontent-%COMP%]{height:56px}.vc-btnPrimary[_ngcontent-%COMP%]{background:#1987b6;border:0;border-radius:8px;bottom:0;height:40px;min-width:90px;padding:5px 20px;width:auto}.mt-50[_ngcontent-%COMP%]{margin-top:50px}.mt-25[_ngcontent-%COMP%]{margin-top:25px}.vc-cardL[_ngcontent-%COMP%]{background:#fff;min-height:250px;padding:15px;width:300px}.vc-cardL[_ngcontent-%COMP%], .vc-msg[_ngcontent-%COMP%]{border:1px solid hsla(0,0%,50.2%,.1607843137254902);border-radius:4px;box-shadow:0 2px 5px rgba(0,0,0,.05);height:auto}.vc-msg[_ngcontent-%COMP%]{background:rgba(25,135,182,.09019607843137255);margin:20px 30px 0;padding:10px;width:315px}table[_ngcontent-%COMP%]{width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{padding:8px;text-align:left}#vcSpinner[_ngcontent-%COMP%]{position:relative}.vc-loader[_ngcontent-%COMP%]{background-color:#eceaea;background-image:url(\"data:image/gif;base64,R0lGODlhAAEAAbMPAMrKyoiIiLGxsevr67+/v9TU1H9/fz8/P2pqalVVVSoqKpSUlKmpqRUVFf///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUU4MEFBRTQxQkFCMTFFNjkyRTJENEE2MjgwNzUzNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUU4MEFBRTUxQkFCMTFFNjkyRTJENEE2MjgwNzUzNUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRTgwQUFFMjFCQUIxMUU2OTJFMkQ0QTYyODA3NTM1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRTgwQUFFMzFCQUIxMUU2OTJFMkQ0QTYyODA3NTM1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t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\");background-position:50%;background-repeat:no-repeat;background-size:50px;filter:alpha(opacity=40);height:100%;opacity:.4;position:absolute;right:0;top:0;width:100%;z-index:10000000}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ScanVcComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-scan-vc',
                        templateUrl: './scan-vc.component.html',
                        styleUrls: ['./scan-vc.component.css']
                    }]
            }], function () { return [{ type: VerifyService }]; }, { item: [{
                    type: i0.Input
                }] });
    })();

    var CoreModule = /** @class */ (function () {
        function CoreModule() {
        }
        return CoreModule;
    }());
    CoreModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreModule });
    CoreModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
                i2.CommonModule,
                i3.ZXingScannerModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CoreModule, { declarations: [ScanVcComponent], imports: [i2.CommonModule,
                i3.ZXingScannerModule], exports: [ScanVcComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CoreModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [ScanVcComponent
                        ],
                        imports: [
                            i2.CommonModule,
                            i3.ZXingScannerModule
                        ],
                        exports: [ScanVcComponent]
                    }]
            }], null, null);
    })();

    var VerifyModule = /** @class */ (function () {
        function VerifyModule() {
        }
        VerifyModule.forChild = function (config) {
            return {
                ngModule: VerifyModule,
                providers: [
                    VerifyLibraryService,
                    {
                        provide: "vcConfig",
                        useValue: config
                    }
                ]
            };
        };
        return VerifyModule;
    }());
    VerifyModule.ɵmod = i0.ɵɵdefineNgModule({ type: VerifyModule });
    VerifyModule.ɵinj = i0.ɵɵdefineInjector({ factory: function VerifyModule_Factory(t) { return new (t || VerifyModule)(); }, imports: [[
                CoreModule
            ], CoreModule] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VerifyModule, { declarations: [VerifyModuleComponent], imports: [CoreModule], exports: [VerifyModuleComponent, CoreModule] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(VerifyModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [VerifyModuleComponent,
                        ],
                        imports: [
                            CoreModule
                        ],
                        exports: [VerifyModuleComponent, CoreModule]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of verify-module
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CoreModule = CoreModule;
    exports.ScanVcComponent = ScanVcComponent;
    exports.VerifyLibraryService = VerifyLibraryService;
    exports.VerifyModule = VerifyModule;
    exports.VerifyModuleComponent = VerifyModuleComponent;
    exports.VerifyService = VerifyService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vc-verification.umd.js.map
