import { __decorate, __metadata, __spread } from 'tslib';
import { EventEmitter, ɵɵdefineInjectable, Output, Injectable, Component, forwardRef, ElementRef, ViewChild, Input, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

var SearchSelectService = /** @class */ (function () {
    function SearchSelectService() {
        this.onTypeSearch = new EventEmitter();
    }
    SearchSelectService.prototype.typeSearch = function () {
        this.onTypeSearch.emit();
    };
    SearchSelectService.ɵprov = ɵɵdefineInjectable({ factory: function SearchSelectService_Factory() { return new SearchSelectService(); }, token: SearchSelectService, providedIn: "root" });
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SearchSelectService.prototype, "onTypeSearch", void 0);
    SearchSelectService = __decorate([
        Injectable({
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
        var par = new HttpParams({ fromObject: filtro });
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
        { type: HttpClient },
        { type: SearchSelectService }
    ]; };
    OptionsComponent = __decorate([
        Component({
            selector: 'ngx-options',
            template: "<ul class=\"list-group\" (scroll)=\"onScroll($event)\" [style.width.px]=\"width\">\n\t<li class=\"list-group-item\" *ngFor=\"let row of mainArray;\" (click)=\"onClickOption(row)\">{{ row[ configs['text'] ] }}</li>  \n\t<li class=\"list-group-item\" *ngIf=\"semResultados\" (click)=\"onClickOption({})\">Sem resultados</li>  \n</ul>",
            styles: [".list-group{margin-top:20px;position:absolute;z-index:5000!important;max-height:250px;width:100%;margin-bottom:10px;overflow-y:scroll}.list-group .list-group-item{cursor:pointer;color:rgba(0,0,0,.87);border:none;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.list-group .list-group-item:hover{background:#007bff}"]
        }),
        __metadata("design:paramtypes", [HttpClient, SearchSelectService])
    ], OptionsComponent);
    return OptionsComponent;
}());

var provider = {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(function () { return SearchSelectComponent; })
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
        var par = new HttpParams({ fromObject: filtro });
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
        var component = new ComponentPortal(OptionsComponent);
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
        { type: HttpClient },
        { type: ElementRef },
        { type: Overlay },
        { type: SearchSelectService }
    ]; };
    __decorate([
        ViewChild("input"),
        __metadata("design:type", Object)
    ], SearchSelectComponent.prototype, "inputcomponent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchSelectComponent.prototype, "configs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SearchSelectComponent.prototype, "readonly", void 0);
    __decorate([
        HostListener('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SearchSelectComponent.prototype, "onGlobalClick", null);
    SearchSelectComponent = __decorate([
        Component({
            selector: 'searchSelect',
            template: "<div class=\"main-container\">\n\t<input type=\"text\" class=\"form-control\" #input (focus)=\"inputFocusFunction( $event );\" [(ngModel)]=\"searchString\" (keyup)=\"onTypeSearchInput()\"> \n\t<i *ngIf=\"searchString != '' && readonly == false \" (click)=\"onClearClick()\" class=\"fas fa-times text-primary\"></i>\n</div>",
            providers: [provider],
            styles: [".main-container{position:relative;width:100%}.main-container .fa-times{position:absolute;right:10px;top:12px;cursor:pointer}.main-container .fa-times:hover{opacity:.8}.main-container .fa-times:active{opacity:.4}"]
        }),
        __metadata("design:paramtypes", [HttpClient, ElementRef, Overlay, SearchSelectService])
    ], SearchSelectComponent);
    return SearchSelectComponent;
}());

var SearchSelectModule = /** @class */ (function () {
    function SearchSelectModule() {
    }
    SearchSelectModule = __decorate([
        NgModule({
            declarations: [SearchSelectComponent, OptionsComponent],
            imports: [
                CommonModule,
                FormsModule
            ],
            exports: [SearchSelectComponent]
        })
    ], SearchSelectModule);
    return SearchSelectModule;
}());

/*
 * Public API Surface of search-select
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SearchSelectComponent, SearchSelectModule, SearchSelectService, OptionsComponent as ɵa };
//# sourceMappingURL=search-select.js.map
