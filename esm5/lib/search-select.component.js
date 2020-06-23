import { __decorate, __metadata } from "tslib";
import { Component, OnInit, HostListener, ElementRef, Input, EventEmitter, Output, forwardRef, ComponentRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { OptionsComponent } from './options/options.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { SearchSelectService } from './search-select.service';
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
export { SearchSelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZWFyY2gtc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdJLE9BQU8sRUFBMEYsaUJBQWlCLEVBQUUsTUFBTyxnQkFBZ0IsQ0FBQztBQUM1SSxPQUFPLEVBQUUsVUFBVSxFQUFDLFVBQVUsRUFBRSxNQUFnQixzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQW9CLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRyxNQUFhLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTyx5QkFBeUIsQ0FBQztBQUcvRCxJQUFNLFFBQVEsR0FBRztJQUNoQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLEtBQUssRUFBRSxJQUFJO0lBQ1gsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEscUJBQXFCLEVBQXJCLENBQXFCLENBQUM7Q0FDcEQsQ0FBQztBQVlGO0lBa0JDLCtCQUFvQixVQUFzQixFQUFTLFVBQXFCLEVBQVEsT0FBZ0IsRUFBUyxtQkFBeUM7UUFBOUgsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBUSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQVoxSSxhQUFRLEdBQUssR0FBRyxDQUFDO1FBQ2xCLGdCQUFXLEdB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QUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLEtBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFFO2dCQUNuQyxLQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQjtRQUNGLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUtYLENBQUM7SUFHRCwyQ0FBVyxHQUFYO1FBQ0MsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO0lBQ0YsQ0FBQzs7Z0JBcEsrQixVQUFVO2dCQUFvQixVQUFVO2dCQUFpQixPQUFPO2dCQUErQixtQkFBbUI7O0lBakI5SDtRQUFuQixTQUFTLENBQUMsT0FBTyxDQUFDOztpRUFBZ0I7SUFDMUI7UUFBUixLQUFLLEVBQUU7OzBEQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7OzJEQUFvQjtJQStJNUI7UUFEQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs4REFTOUM7SUExSlcscUJBQXFCO1FBUmpDLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLDhVQUE2QztZQUU3QyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O1NBQ3JCLENBQUM7eUNBcUIrQixVQUFVLEVBQW9CLFVBQVUsRUFBaUIsT0FBTyxFQUErQixtQkFBbUI7T0FsQnRJLHFCQUFxQixDQTJMakM7SUFBRCw0QkFBQztDQUFBLEFBM0xELElBMkxDO1NBM0xZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCxmb3J3YXJkUmVmLCBDb21wb25lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEFic3RyYWN0Q29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gXHRmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LEh0dHBQYXJhbXMgfSBcdFx0XHRcdFx0XHRcdFx0XHRcdGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE92ZXJsYXkgfSBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT3B0aW9uc0NvbXBvbmVudCAgfSBcdFx0XHRcdFx0XHRcdGZyb20gJy4vb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuXG5pbXBvcnQgeyBTZWFyY2hTZWxlY3RTZXJ2aWNlIH0gXHRmcm9tICcuL3NlYXJjaC1zZWxlY3Quc2VydmljZSc7XG5cblxuY29uc3QgcHJvdmlkZXIgPSB7XG5cdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRtdWx0aTogdHJ1ZSxcblx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VhcmNoU2VsZWN0Q29tcG9uZW50KVxufTtcblxuICBcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2VhcmNoU2VsZWN0Jyxcblx0dGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zZWFyY2gtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG5cdHByb3ZpZGVyczogW3Byb3ZpZGVyXVxufSlcblxuXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3Nvcntcblx0QFZpZXdDaGlsZChcImlucHV0XCIpIGlucHV0Y29tcG9uZW50O1xuXHRASW5wdXQoKSBjb25maWdzO1xuXHRASW5wdXQoKSByZWFkb25seSA6IGJvb2xlYW47XG4gXG5cdFxuXHRwcml2YXRlIGRlc2NvbnRvIFx0XHQ9IDgwMDtcblx0cHVibGljIGxpc3RFbmFibGVkIFx0XHQ9IGZhbHNlOyBcblx0cHVibGljIHNlYXJjaFN0cmluZyBcdD0gJyc7XG5cdHB1YmxpYyBzZW1SZXN1bHRhZG9zIFx0PSBmYWxzZTtcblx0cHVibGljIGtleXVwRGVsYXk7XG5cdHB1YmxpYyBtYWluQXJyYXkgPSBbXTtcblx0cHVibGljIGRpc2FibGVTY3JvbGxEZXRlY3QgPSBmYWxzZTtcblx0XG5cdG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cdHZhbHVlOiBhbnk7XG5cdG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXHRcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBwdWJsaWMgZWxlbWVudFJlZjpFbGVtZW50UmVmLHB1YmxpYyBvdmVybGF5OiBPdmVybGF5LCBwdWJsaWMgc2VhcmNoU2VsZWN0U2VydmljZSA6IFNlYXJjaFNlbGVjdFNlcnZpY2UgKSB7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnJlYWRvbmx5IHx8IGZhbHNlKTtcblx0fVxuXG5cblx0Ly9ERUZBVUxUIERPIEZPUk1CVUlMREVSXG5cdHB1YmxpYyBkZWZhdWx0VmFsdWUgPSAnJztcblx0d3JpdGVWYWx1ZShvYmo6IGFueSA9ICcnKTogdm9pZCB7XG5cdFx0dGhpcy52YWx1ZSA9IG9iajtcblx0XHR0aGlzLmRlZmF1bHRWYWx1ZSA9ICB0aGlzLnZhbHVlO1xuXHRcdGlmKCB0aGlzLmRlZmF1bHRWYWx1ZSAhPSAnJyApe1xuXHRcdFx0dGhpcy5zZXREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm4pe1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG5cdH1cblx0XG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xuXHR9XG5cdHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblx0Ly9cdC4vREVGQVVMVCBETyBGT1JNQlVJTERFUlxuIFxuXHRcblxuXG5cdG9uQ2xlYXJDbGljaygpe1xuXHRcdFxuXHRcdHRoaXMuc2VhcmNoU3RyaW5nIFx0XHQ9ICcnO1xuXHRcdHRoaXMuY29uZmlnc1snc2VhcmNoJ11cdD0gJyc7XG5cdFx0dGhpcy52YWx1ZSA9ICcnO1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMudmFsdWUpOyAgIFxuXHR9XG5cblxuXG5cblxuXG5cdHNldERlZmF1bHQoKXtcblx0XHRsZXQgZmlsdHJvID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZ3MpKTtcblx0XHRsZXQgdXJsIFx0XHRcdD0gZmlsdHJvWydzZXJ2aWNlJ107XG5cdFx0ZmlsdHJvWydsaW1pdCddIFx0PSAxO1xuXHRcdGZpbHRyb1snb2Zmc2V0J10gXHQ9IDA7XG5cdFx0ZmlsdHJvWyB0aGlzLmNvbmZpZ3NbJ2tleSddIF0gPSB0aGlzLmRlZmF1bHRWYWx1ZTtcblx0XHRkZWxldGUgZmlsdHJvWydzZXJ2aWNlJ107XG5cdFx0ZGVsZXRlIGZpbHRyb1sna2V5J107XG5cdFx0ZGVsZXRlIGZpbHRyb1sndGV4dCddO1xuXHRcdGxldCBwYXIgID0gbmV3IEh0dHBQYXJhbXMoeyBmcm9tT2JqZWN0OiBmaWx0cm8gfSk7XG5cdFx0dXJsICs9IHVybC5pbmNsdWRlcyhcIj9cIikgPyAoJyYnK3BhcikgOiAoJz8nK3Bhcik7IFxuXHRcdHRoaXMuaHR0cENsaWVudC5nZXQoIHVybCApLnN1YnNjcmliZSggcmVzID0+IHtcblx0XHRcdGlmKCByZXNbJ2RhdGEnXSAhPSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShyZXNbJ2RhdGEnXSkgJiYgcmVzWydkYXRhJ10ubGVuZ3RoID4gMCApe1xuXHRcdFx0XHRsZXQgZGVmYXVsdE9iaiA9IHJlc1snZGF0YSddWzBdO1xuXHRcdFx0XHRpZiggZGVmYXVsdE9iaiAhPSB1bmRlZmluZWQgKXtcblx0XHRcdFx0XHR0aGlzLnNlYXJjaFN0cmluZyA9IGRlZmF1bHRPYmpbIHRoaXMuY29uZmlnc1sndGV4dCddIF07XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5pbnB1dGNvbXBvbmVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRoaXMucmVhZG9ubHkgKTsgLy9BcGVuYXMgZnVuY2lvbmEgbm8gZWRpdGFyLCBubyBhZGljaW9uYXIgbsOjbyBtZXRlIGRlZmF1bHQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXG5cdG9uVHlwZVNlYXJjaElucHV0KCl7XG5cdFx0aWYoIHRoaXMua2V5dXBEZWxheSApe1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMua2V5dXBEZWxheSk7XG5cdFx0fVxuXHRcdHRoaXMua2V5dXBEZWxheSA9IHNldFRpbWVvdXQoKCk9PnsgXG5cdFx0XHR0aGlzLmNvbmZpZ3NbJ3NlYXJjaCddXHRcdD0gKHRoaXMuc2VhcmNoU3RyaW5nIHx8ICcnKTtcblx0XHRcdHRoaXMuc2VhcmNoU2VsZWN0U2VydmljZS50eXBlU2VhcmNoKCk7IFxuXHRcdFx0dGhpcy5rZXl1cERlbGF5ID0gdW5kZWZpbmVkO1xuXHRcdH0sIDUwMCk7XG5cdH1cblxuXG5cdFxuXG5cblx0cHVibGljIG92ZXJsYXlSZWY7XG5cdHB1YmxpYyBjb21wUmVmO1xuXHR0b2dnbGVTZWxlY3QoIGFjdCApe1xuXHRcdC8vIGxldCB0b3AgPSAoIHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkgPCAyNTAgPyBmYWxzZSA6IHRydWU7XG5cdFx0Y29uc3QgcG9zaXRpb25TdHJhdGVneSA9ICB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5jb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXG5cdFx0XHR7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH0sIFxuXHRcdFx0Ly8geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICh0b3AgPyAndG9wJyA6ICdib3R0b20nKSB9XG5cdFx0XHR7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfVxuXHRcdCk7XG5cblx0XHR0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcblx0XHRcdHBvc2l0aW9uU3RyYXRlZ3k6IHBvc2l0aW9uU3RyYXRlZ3ksICBcblx0XHRcdGhhc0JhY2tkcm9wOiBmYWxzZSxcblx0XHRcdC8vIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpLCBcblx0XHR9KTtcblx0XHRjb25zdCBjb21wb25lbnQgXHRcdD0gbmV3IENvbXBvbmVudFBvcnRhbChPcHRpb25zQ29tcG9uZW50KTtcblx0XHRjb25zdCBjb21wUmVmOiBDb21wb25lbnRSZWY8T3B0aW9uc0NvbXBvbmVudD4gPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKGNvbXBvbmVudCk7XG5cdFx0Y29tcFJlZi5pbnN0YW5jZS53aWR0aCBcdFx0PSAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1swXS5jbGllbnRXaWR0aDtcblx0XHRjb21wUmVmLmluc3RhbmNlLmNvbmZpZ3MgXHQ9ICB0aGlzLmNvbmZpZ3M7XG5cdFx0Y29tcFJlZi5pbnN0YW5jZS5vblJldHVybkRhdGEgPSAob3B0KT0+eyBcblx0XHRcdGlmKCBvcHRbIHRoaXMuY29uZmlnc1sna2V5J10gXSAhPSB1bmRlZmluZWQgKXtcblx0XHRcdFx0dGhpcy5zZWFyY2hTdHJpbmcgPSBvcHRbIHRoaXMuY29uZmlnc1sndGV4dCddIF07XG5cdFx0XHRcdHRoaXMudmFsdWUgPSBvcHRbIHRoaXMuY29uZmlnc1sna2V5J10gXTtcblx0XHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSk7IFxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2VhcmNoU3RyaW5nIFx0XHQ9ICcnO1xuXHRcdFx0XHR0aGlzLmNvbmZpZ3NbJ3NlYXJjaCddXHQ9ICcnO1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gJyc7XG5cdFx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMudmFsdWUpOyAgIFxuXHRcdFx0fSBcblx0XHRcdFxuXHRcdFx0c2V0VGltZW91dCgoKT0+eyBcblx0XHRcdFx0dGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcblx0XHRcdH0sIDEwMCk7XG5cdFx0fVxuXHRcdHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7ICBcblx0XHR9KTtcblx0fVxuXG5cblxuXHRpbnB1dEZvY3VzRnVuY3Rpb24oIGV2ICl7XG5cdFx0dGhpcy50b2dnbGVTZWxlY3QoIHRydWUgKTtcblx0XHR0aGlzLm9uVG91Y2hlZCAmJiB0aGlzLm9uVG91Y2hlZCgpO1xuXHR9XG5cblxuXHQvL0NMT1NFIFdIRU4gQ0xJQ0sgT1VUU0lERVxuXHRASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZWRvd24nLCBbJyRldmVudCddKVxuXHRvbkdsb2JhbENsaWNrKGV2ZW50KTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57IFxuXHRcdFx0XHRpZiggdGhpcy5vdmVybGF5UmVmICE9IHVuZGVmaW5lZCApe1xuXHRcdFx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDMwMCk7XG5cdFx0fVxuXHR9XG5cdFxuXHRcblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcblx0XHRcdGlmKCB0aGlzLm92ZXJsYXlSZWYgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdHRoaXMuaW5wdXRjb21wb25lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKT0+e1xuXHRcdCAgIGlmKCB0aGlzLm92ZXJsYXlSZWYgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdHRoaXMuaW5wdXRjb21wb25lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHR9XG5cdFx0fSwgZmFsc2UpO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdFxuXHR9XG5cdFxuXHRcblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0aWYoIHRoaXMub3ZlcmxheVJlZiAhPSB1bmRlZmluZWQgKXtcblx0XHRcdHRoaXMuaW5wdXRjb21wb25lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0XHR0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuXHRcdH1cblx0fVxuXHRcblx0XG5cdCAgXG5cdFxufVxuIl19