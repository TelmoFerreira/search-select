import { __decorate, __metadata } from 'tslib';
import { EventEmitter, ɵɵdefineInjectable, Output, Injectable, Component, forwardRef, ElementRef, ViewChild, Input, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

let SearchSelectService = class SearchSelectService {
    constructor() {
        this.onTypeSearch = new EventEmitter();
    }
    typeSearch() {
        this.onTypeSearch.emit();
    }
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

let OptionsComponent = class OptionsComponent {
    constructor(httpClient, searchSelectService) {
        this.httpClient = httpClient;
        this.searchSelectService = searchSelectService;
        this.width = 500;
        this.configs = {};
        this.desconto = 800;
        // public searchString 	= '';
        this.semResultados = false;
        this.mainArray = [];
        this.disableScrollDetect = false;
        this.searchSelectService.onTypeSearch.subscribe(res => {
            this.mainArray = [];
            this.loadMore();
        });
    }
    onClickOption(opt) {
        this.onReturnData(opt);
    }
    loadMore() {
        this.semResultados = false;
        this.disableScrollDetect = true;
        let filtro = JSON.parse(JSON.stringify(this.configs));
        let url = filtro['service'];
        filtro['limit'] = 50;
        filtro['offset'] = this.mainArray.length;
        delete filtro['service'];
        delete filtro['key'];
        delete filtro['text'];
        let par = new HttpParams({ fromObject: filtro });
        url += url.includes("?") ? ('&' + par) : ('?' + par);
        this.httpClient.get(url).subscribe(res => {
            if (res['data'] != undefined && Array.isArray(res['data']) && res['data'].length > 0) {
                this.disableScrollDetect = false;
                this.mainArray = [...this.mainArray, ...res['data']];
            }
            else {
                this.semResultados = true;
            }
        });
    }
    onScroll(ev) {
        if (!this.disableScrollDetect && ((ev.target.offsetHeight + ev.target.scrollTop + this.desconto) >= ev.target.scrollHeight)) {
            this.loadMore();
        }
    }
    ngOnInit() {
        this.loadMore();
    }
};
OptionsComponent.ctorParameters = () => [
    { type: HttpClient },
    { type: SearchSelectService }
];
OptionsComponent = __decorate([
    Component({
        selector: 'ngx-options',
        template: "<ul class=\"list-group\" (scroll)=\"onScroll($event)\" [style.width.px]=\"width\">\n\t<li class=\"list-group-item\" *ngFor=\"let row of mainArray;\" (click)=\"onClickOption(row)\">{{ row[ configs['text'] ] }}</li>  \n\t<li class=\"list-group-item\" *ngIf=\"semResultados\" (click)=\"onClickOption({})\">Sem resultados</li>  \n</ul>",
        styles: [".list-group{margin-top:20px;position:absolute;z-index:5000!important;max-height:250px;width:100%;margin-bottom:10px;overflow-y:scroll}.list-group .list-group-item{cursor:pointer;color:rgba(0,0,0,.87);border:none;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.list-group .list-group-item:hover{background:#007bff}"]
    }),
    __metadata("design:paramtypes", [HttpClient, SearchSelectService])
], OptionsComponent);

const provider = {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SearchSelectComponent)
};
let SearchSelectComponent = class SearchSelectComponent {
    constructor(httpClient, elementRef, overlay, searchSelectService) {
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
        this.onChange = (_) => { };
        this.onTouched = () => { };
        //DEFAULT DO FORMBUILDER
        this.defaultValue = '';
        this.propagateChange = (_) => { };
        this.readonly = (this.readonly || false);
    }
    writeValue(obj = '') {
        this.value = obj;
        this.defaultValue = this.value;
        if (this.defaultValue != '') {
            this.setDefault();
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    //	./DEFAULT DO FORMBUILDER
    onClearClick() {
        this.searchString = '';
        this.configs['search'] = '';
        this.value = '';
        this.propagateChange(this.value);
    }
    setDefault() {
        let filtro = JSON.parse(JSON.stringify(this.configs));
        let url = filtro['service'];
        filtro['limit'] = 1;
        filtro['offset'] = 0;
        filtro[this.configs['key']] = this.defaultValue;
        delete filtro['service'];
        delete filtro['key'];
        delete filtro['text'];
        let par = new HttpParams({ fromObject: filtro });
        url += url.includes("?") ? ('&' + par) : ('?' + par);
        this.httpClient.get(url).subscribe(res => {
            if (res['data'] != undefined && Array.isArray(res['data']) && res['data'].length > 0) {
                let defaultObj = res['data'][0];
                if (defaultObj != undefined) {
                    this.searchString = defaultObj[this.configs['text']];
                }
                this.inputcomponent.nativeElement.setAttribute("disabled", this.readonly); //Apenas funciona no editar, no adicionar não mete default;
            }
        });
    }
    onTypeSearchInput() {
        if (this.keyupDelay) {
            clearTimeout(this.keyupDelay);
        }
        this.keyupDelay = setTimeout(() => {
            this.configs['search'] = (this.searchString || '');
            this.searchSelectService.typeSearch();
            this.keyupDelay = undefined;
        }, 500);
    }
    toggleSelect(act) {
        // let top = ( window.innerHeight - this.elementRef.nativeElement.getBoundingClientRect().top) < 250 ? false : true;
        const positionStrategy = this.overlay.position().connectedTo(this.elementRef.nativeElement, { originX: 'start', originY: 'center' }, 
        // { overlayX: 'start', overlayY: (top ? 'top' : 'bottom') }
        { overlayX: 'start', overlayY: 'bottom' });
        this.overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
            hasBackdrop: false,
        });
        const component = new ComponentPortal(OptionsComponent);
        const compRef = this.overlayRef.attach(component);
        compRef.instance.width = this.elementRef.nativeElement.childNodes[0].clientWidth;
        compRef.instance.configs = this.configs;
        compRef.instance.onReturnData = (opt) => {
            if (opt[this.configs['key']] != undefined) {
                this.searchString = opt[this.configs['text']];
                this.value = opt[this.configs['key']];
                this.propagateChange(this.value);
            }
            else {
                this.searchString = '';
                this.configs['search'] = '';
                this.value = '';
                this.propagateChange(this.value);
            }
            setTimeout(() => {
                this.overlayRef.dispose();
            }, 100);
        };
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });
    }
    inputFocusFunction(ev) {
        this.toggleSelect(true);
        this.onTouched && this.onTouched();
    }
    //CLOSE WHEN CLICK OUTSIDE
    onGlobalClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            setTimeout(() => {
                if (this.overlayRef != undefined) {
                    this.overlayRef.dispose();
                }
            }, 300);
        }
    }
    ngOnInit() {
        document.addEventListener('visibilitychange', () => {
            if (this.overlayRef != undefined) {
                this.inputcomponent.nativeElement.blur();
                this.overlayRef.dispose();
            }
        });
        window.addEventListener('blur', () => {
            if (this.overlayRef != undefined) {
                this.inputcomponent.nativeElement.blur();
                this.overlayRef.dispose();
            }
        }, false);
    }
    ngOnDestroy() {
        if (this.overlayRef != undefined) {
            this.inputcomponent.nativeElement.blur();
            this.overlayRef.dispose();
        }
    }
};
SearchSelectComponent.ctorParameters = () => [
    { type: HttpClient },
    { type: ElementRef },
    { type: Overlay },
    { type: SearchSelectService }
];
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

let SearchSelectModule = class SearchSelectModule {
};
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

/*
 * Public API Surface of search-select
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SearchSelectComponent, SearchSelectModule, SearchSelectService, OptionsComponent as ɵa };
//# sourceMappingURL=search-select.js.map
