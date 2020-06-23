(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common/http'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('search-select', ['exports', '@angular/core', '@angular/forms', '@angular/common/http', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common'], factory) :
    (global = global || self, factory(global['search-select'] = {}, global.ng.core, global.ng.forms, global.ng.common.http, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common));
}(this, (function (exports, core, forms, http, overlay, portal, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var SearchSelectService = /** @class */ (function () {
        function SearchSelectService() {
            this.onTypeSearch = new core.EventEmitter();
        }
        SearchSelectService.prototype.typeSearch = function () {
            this.onTypeSearch.emit();
        };
        SearchSelectService.ɵprov = core.ɵɵdefineInjectable({ factory: function SearchSelectService_Factory() { return new SearchSelectService(); }, token: SearchSelectService, providedIn: "root" });
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SearchSelectService.prototype, "onTypeSearch", void 0);
        SearchSelectService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __metadata("design:paramtypes", [])
        ], SearchSelectService);
        return SearchSelectService;
    }());

    var OptionsComponent = /** @class */ (function () {
        function OptionsComponent(httpClient, searchSelectService) {
            var _this = this;
            this.httpClient = httpClient;
            this.searchSelectService = searchSelectService;
            this.width = 500;
            this.configs = {};
            this.desconto = 800;
            // public searchString 	= '';
            this.semResultados = false;
            this.mainArray = [];
            this.disableScrollDetect = false;
            this.searchSelectService.onTypeSearch.subscribe(function (res) {
                _this.mainArray = [];
                _this.loadMore();
            });
        }
        OptionsComponent.prototype.onClickOption = function (opt) {
            this.onReturnData(opt);
        };
        OptionsComponent.prototype.loadMore = function () {
            var _this = this;
            this.semResultados = false;
            this.disableScrollDetect = true;
            var filtro = JSON.parse(JSON.stringify(this.configs));
            var url = filtro['service'];
            filtro['limit'] = 50;
            filtro['offset'] = this.mainArray.length;
            delete filtro['service'];
            delete filtro['key'];
            delete filtro['text'];
            var par = new http.HttpParams({ fromObject: filtro });
            url += url.includes("?") ? ('&' + par) : ('?' + par);
            this.httpClient.get(url).subscribe(function (res) {
                if (res['data'] != undefined && Array.isArray(res['data']) && res['data'].length > 0) {
                    _this.disableScrollDetect = false;
                    _this.mainArray = __spread(_this.mainArray, res['data']);
                }
                else {
                    _this.semResultados = true;
                }
            });
        };
        OptionsComponent.prototype.onScroll = function (ev) {
            if (!this.disableScrollDetect && ((ev.target.offsetHeight + ev.target.scrollTop + this.desconto) >= ev.target.scrollHeight)) {
                this.loadMore();
            }
        };
        OptionsComponent.prototype.ngOnInit = function () {
            this.loadMore();
        };
        OptionsComponent.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: SearchSelectService }
        ]; };
        OptionsComponent = __decorate([
            core.Component({
                selector: 'ngx-options',
                template: "<ul class=\"list-group\" (scroll)=\"onScroll($event)\" [style.width.px]=\"width\">\n\t<li class=\"list-group-item\" *ngFor=\"let row of mainArray;\" (click)=\"onClickOption(row)\">{{ row[ configs['text'] ] }}</li>  \n\t<li class=\"list-group-item\" *ngIf=\"semResultados\" (click)=\"onClickOption({})\">Sem resultados</li>  \n</ul>",
                styles: [".list-group{margin-top:20px;position:absolute;z-index:5000!important;max-height:250px;width:100%;margin-bottom:10px;overflow-y:scroll}.list-group .list-group-item{cursor:pointer;color:rgba(0,0,0,.87);border:none;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.list-group .list-group-item:hover{background:#007bff}"]
            }),
            __metadata("design:paramtypes", [http.HttpClient, SearchSelectService])
        ], OptionsComponent);
        return OptionsComponent;
    }());

    var provider = {
        provide: forms.NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: core.forwardRef(function () { return SearchSelectComponent; })
    };
    var SearchSelectComponent = /** @class */ (function () {
        function SearchSelectComponent(httpClient, elementRef, overlay, searchSelectService) {
            this.httpClient = httpClient;
            this.elementRef = elementRef;
            this.overlay = overlay;
            this.searchSelectService = searchSelectService;
            this.desconto = 800;
            this.listEnabled = false;
            this.searchString = '';
            this.semResultados = false;
            this.mainArray = [];
            this.disableScrollDetect = false;
            this.onChange = function (_) { };
            this.onTouched = function () { };
            //DEFAULT DO FORMBUILDER
            this.defaultValue = '';
            this.propagateChange = function (_) { };
            this.readonly = (this.readonly || false);
        }
        SearchSelectComponent.prototype.writeValue = function (obj) {
            if (obj === void 0) { obj = ''; }
            this.value = obj;
            this.defaultValue = this.value;
            if (this.defaultValue != '') {
                this.setDefault();
            }
        };
        SearchSelectComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        SearchSelectComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        //	./DEFAULT DO FORMBUILDER
        SearchSelectComponent.prototype.onClearClick = function () {
            this.searchString = '';
            this.configs['search'] = '';
            this.value = '';
            this.propagateChange(this.value);
        };
        SearchSelectComponent.prototype.setDefault = function () {
            var _this = this;
            var filtro = JSON.parse(JSON.stringify(this.configs));
            var url = filtro['service'];
            filtro['limit'] = 1;
            filtro['offset'] = 0;
            filtro[this.configs['key']] = this.defaultValue;
            delete filtro['service'];
            delete filtro['key'];
            delete filtro['text'];
            var par = new http.HttpParams({ fromObject: filtro });
            url += url.includes("?") ? ('&' + par) : ('?' + par);
            this.httpClient.get(url).subscribe(function (res) {
                if (res['data'] != undefined && Array.isArray(res['data']) && res['data'].length > 0) {
                    var defaultObj = res['data'][0];
                    if (defaultObj != undefined) {
                        _this.searchString = defaultObj[_this.configs['text']];
                    }
                    _this.inputcomponent.nativeElement.setAttribute("disabled", _this.readonly); //Apenas funciona no editar, no adicionar não mete default;
                }
            });
        };
        SearchSelectComponent.prototype.onTypeSearchInput = function () {
            var _this = this;
            if (this.keyupDelay) {
                clearTimeout(this.keyupDelay);
            }
            this.keyupDelay = setTimeout(function () {
                _this.configs['search'] = (_this.searchString || '');
                _this.searchSelectService.typeSearch();
                _this.keyupDelay = undefined;
            }, 500);
        };
        SearchSelectComponent.prototype.toggleSelect = function (act) {
            var _this = this;
            // let top = ( window.innerHeight - this.elementRef.nativeElement.getBoundingClientRect().top) < 250 ? false : true;
            var positionStrategy = this.overlay.position().connectedTo(this.elementRef.nativeElement, { originX: 'start', originY: 'center' }, 
            // { overlayX: 'start', overlayY: (top ? 'top' : 'bottom') }
            { overlayX: 'start', overlayY: 'bottom' });
            this.overlayRef = this.overlay.create({
                positionStrategy: positionStrategy,
                hasBackdrop: false,
            });
            var component = new portal.ComponentPortal(OptionsComponent);
            var compRef = this.overlayRef.attach(component);
            compRef.instance.width = this.elementRef.nativeElement.childNodes[0].clientWidth;
            compRef.instance.configs = this.configs;
            compRef.instance.onReturnData = function (opt) {
                if (opt[_this.configs['key']] != undefined) {
                    _this.searchString = opt[_this.configs['text']];
                    _this.value = opt[_this.configs['key']];
                    _this.propagateChange(_this.value);
                }
                else {
                    _this.searchString = '';
                    _this.configs['search'] = '';
                    _this.value = '';
                    _this.propagateChange(_this.value);
                }
                setTimeout(function () {
                    _this.overlayRef.dispose();
                }, 100);
            };
            this.overlayRef.backdropClick().subscribe(function () {
                _this.overlayRef.dispose();
            });
        };
        SearchSelectComponent.prototype.inputFocusFunction = function (ev) {
            this.toggleSelect(true);
            this.onTouched && this.onTouched();
        };
        //CLOSE WHEN CLICK OUTSIDE
        SearchSelectComponent.prototype.onGlobalClick = function (event) {
            var _this = this;
            if (!this.elementRef.nativeElement.contains(event.target)) {
                setTimeout(function () {
                    if (_this.overlayRef != undefined) {
                        _this.overlayRef.dispose();
                    }
                }, 300);
            }
        };
        SearchSelectComponent.prototype.ngOnInit = function () {
            var _this = this;
            document.addEventListener('visibilitychange', function () {
                if (_this.overlayRef != undefined) {
                    _this.inputcomponent.nativeElement.blur();
                    _this.overlayRef.dispose();
                }
            });
            window.addEventListener('blur', function () {
                if (_this.overlayRef != undefined) {
                    _this.inputcomponent.nativeElement.blur();
                    _this.overlayRef.dispose();
                }
            }, false);
        };
        SearchSelectComponent.prototype.ngOnDestroy = function () {
            if (this.overlayRef != undefined) {
                this.inputcomponent.nativeElement.blur();
                this.overlayRef.dispose();
            }
        };
        SearchSelectComponent.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: core.ElementRef },
            { type: overlay.Overlay },
            { type: SearchSelectService }
        ]; };
        __decorate([
            core.ViewChild("input"),
            __metadata("design:type", Object)
        ], SearchSelectComponent.prototype, "inputcomponent", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SearchSelectComponent.prototype, "configs", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SearchSelectComponent.prototype, "readonly", void 0);
        __decorate([
            core.HostListener('document:mousedown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], SearchSelectComponent.prototype, "onGlobalClick", null);
        SearchSelectComponent = __decorate([
            core.Component({
                selector: 'searchSelect',
                template: "<div class=\"main-container\">\n\t<input type=\"text\" class=\"form-control\" #input (focus)=\"inputFocusFunction( $event );\" [(ngModel)]=\"searchString\" (keyup)=\"onTypeSearchInput()\"> \n\t<i *ngIf=\"searchString != '' && readonly == false \" (click)=\"onClearClick()\" class=\"fas fa-times text-primary\"></i>\n</div>",
                providers: [provider],
                styles: [".main-container{position:relative;width:100%}.main-container .fa-times{position:absolute;right:10px;top:12px;cursor:pointer}.main-container .fa-times:hover{opacity:.8}.main-container .fa-times:active{opacity:.4}"]
            }),
            __metadata("design:paramtypes", [http.HttpClient, core.ElementRef, overlay.Overlay, SearchSelectService])
        ], SearchSelectComponent);
        return SearchSelectComponent;
    }());

    var SearchSelectModule = /** @class */ (function () {
        function SearchSelectModule() {
        }
        SearchSelectModule = __decorate([
            core.NgModule({
                declarations: [SearchSelectComponent, OptionsComponent],
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                exports: [SearchSelectComponent]
            })
        ], SearchSelectModule);
        return SearchSelectModule;
    }());

    exports.SearchSelectComponent = SearchSelectComponent;
    exports.SearchSelectModule = SearchSelectModule;
    exports.SearchSelectService = SearchSelectService;
    exports.ɵa = OptionsComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=search-select.umd.js.map
