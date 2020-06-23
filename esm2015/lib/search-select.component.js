import { __decorate, __metadata } from "tslib";
import { Component, OnInit, HostListener, ElementRef, Input, EventEmitter, Output, forwardRef, ComponentRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { OptionsComponent } from './options/options.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { SearchSelectService } from './search-select.service';
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
export { SearchSelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZWFyY2gtc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdJLE9BQU8sRUFBMEYsaUJBQWlCLEVBQUUsTUFBTyxnQkFBZ0IsQ0FBQztBQUM1SSxPQUFPLEVBQUUsVUFBVSxFQUFDLFVBQVUsRUFBRSxNQUFnQixzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQW9CLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRyxNQUFhLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTyx5QkFBeUIsQ0FBQztBQUcvRCxNQUFNLFFBQVEsR0FBRztJQUNoQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLEtBQUssRUFBRSxJQUFJO0lBQ1gsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztDQUNwRCxDQUFDO0FBWUYsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFrQmpDLFlBQW9CLFVBQXNCLEVBQVMsVUFBcUIsRUFBUSxPQUFnQixFQUFTLG1CQUF5QztRQUE5SCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUFRLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBUyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1FBWjFJLGFBQVEsR0FBSyxHQUFHLENBQUM7UUFDbEIsZ0JBQVcsR0FBSyxLQUFLLENBQUM7UUFDdEIsaUJBQVksR0FBSSxFQUFFLENBQUM7UUFDbkIsa0JBQWEsR0FBSSxLQUFLLENBQUM7UUFFdkIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUVuQyxhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUUxQixjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBT3JCLHdCQUF3QjtRQUNqQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQWV6QixvQkFBZSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFwQmpDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFLRCxVQUFVLENBQUMsTUFBVyxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNsQjtJQUNGLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQkFBMkI7SUFLM0IsWUFBWTtRQUVYLElBQUksQ0FBQyxZQUFZLEdBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFPRCxVQUFVO1FBQ1QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksR0FBRyxHQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBSSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2xELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksR0FBRyxHQUFJLElBQUksVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEQsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JGLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFO29CQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUM7aUJBQ3ZEO2dCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUMsMkRBQTJEO2FBQ3ZJO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBR0QsaUJBQWlCO1FBQ2hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBUUQsWUFBWSxDQUFFLEdBQUc7UUFDaEIsb0hBQW9IO1FBQ3BILE1BQU0sZ0JBQWdCLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQzFGLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO1FBQ3ZDLDREQUE0RDtRQUM1RCxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUN6QyxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNyQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7WUFDbEMsV0FBVyxFQUFFLEtBQUs7U0FFbEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQUssSUFBSSxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRCxNQUFNLE9BQU8sR0FBbUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNwRixPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxFQUFDLEVBQUU7WUFDdEMsSUFBSSxHQUFHLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBRSxJQUFJLFNBQVMsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO2lCQUFJO2dCQUNKLElBQUksQ0FBQyxZQUFZLEdBQUssRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUlELGtCQUFrQixDQUFFLEVBQUU7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBR0QsMEJBQTBCO0lBRTFCLGFBQWEsQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFELFVBQVUsQ0FBQyxHQUFFLEVBQUU7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDMUI7WUFDRixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDUjtJQUNGLENBQUM7SUFHRCxRQUFRO1FBQ1AsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtZQUNsRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFFLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUI7UUFDRixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFLWCxDQUFDO0lBR0QsV0FBVztRQUNWLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjtJQUNGLENBQUM7Q0FLRCxDQUFBOztZQXpLZ0MsVUFBVTtZQUFvQixVQUFVO1lBQWlCLE9BQU87WUFBK0IsbUJBQW1COztBQWpCOUg7SUFBbkIsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7NkRBQWdCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOztzREFBUztBQUNSO0lBQVIsS0FBSyxFQUFFOzt1REFBb0I7QUErSTVCO0lBREMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7MERBUzlDO0FBMUpXLHFCQUFxQjtJQVJqQyxTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsY0FBYztRQUN4Qiw4VUFBNkM7UUFFN0MsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOztLQUNyQixDQUFDO3FDQXFCK0IsVUFBVSxFQUFvQixVQUFVLEVBQWlCLE9BQU8sRUFBK0IsbUJBQW1CO0dBbEJ0SSxxQkFBcUIsQ0EyTGpDO1NBM0xZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCxmb3J3YXJkUmVmLCBDb21wb25lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIEFic3RyYWN0Q29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gXHRmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LEh0dHBQYXJhbXMgfSBcdFx0XHRcdFx0XHRcdFx0XHRcdGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE92ZXJsYXkgfSBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT3B0aW9uc0NvbXBvbmVudCAgfSBcdFx0XHRcdFx0XHRcdGZyb20gJy4vb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuXG5pbXBvcnQgeyBTZWFyY2hTZWxlY3RTZXJ2aWNlIH0gXHRmcm9tICcuL3NlYXJjaC1zZWxlY3Quc2VydmljZSc7XG5cblxuY29uc3QgcHJvdmlkZXIgPSB7XG5cdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRtdWx0aTogdHJ1ZSxcblx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VhcmNoU2VsZWN0Q29tcG9uZW50KVxufTtcblxuICBcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2VhcmNoU2VsZWN0Jyxcblx0dGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zZWFyY2gtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG5cdHByb3ZpZGVyczogW3Byb3ZpZGVyXVxufSlcblxuXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3Nvcntcblx0QFZpZXdDaGlsZChcImlucHV0XCIpIGlucHV0Y29tcG9uZW50O1xuXHRASW5wdXQoKSBjb25maWdzO1xuXHRASW5wdXQoKSByZWFkb25seSA6IGJvb2xlYW47XG4gXG5cdFxuXHRwcml2YXRlIGRlc2NvbnRvIFx0XHQ9IDgwMDtcblx0cHVibGljIGxpc3RFbmFibGVkIFx0XHQ9IGZhbHNlOyBcblx0cHVibGljIHNlYXJjaFN0cmluZyBcdD0gJyc7XG5cdHB1YmxpYyBzZW1SZXN1bHRhZG9zIFx0PSBmYWxzZTtcblx0cHVibGljIGtleXVwRGVsYXk7XG5cdHB1YmxpYyBtYWluQXJyYXkgPSBbXTtcblx0cHVibGljIGRpc2FibGVTY3JvbGxEZXRlY3QgPSBmYWxzZTtcblx0XG5cdG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cdHZhbHVlOiBhbnk7XG5cdG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXHRcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBwdWJsaWMgZWxlbWVudFJlZjpFbGVtZW50UmVmLHB1YmxpYyBvdmVybGF5OiBPdmVybGF5LCBwdWJsaWMgc2VhcmNoU2VsZWN0U2VydmljZSA6IFNlYXJjaFNlbGVjdFNlcnZpY2UgKSB7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnJlYWRvbmx5IHx8IGZhbHNlKTtcblx0fVxuXG5cblx0Ly9ERUZBVUxUIERPIEZPUk1CVUlMREVSXG5cdHB1YmxpYyBkZWZhdWx0VmFsdWUgPSAnJztcblx0d3JpdGVWYWx1ZShvYmo6IGFueSA9ICcnKTogdm9pZCB7XG5cdFx0dGhpcy52YWx1ZSA9IG9iajtcblx0XHR0aGlzLmRlZmF1bHRWYWx1ZSA9ICB0aGlzLnZhbHVlO1xuXHRcdGlmKCB0aGlzLmRlZmF1bHRWYWx1ZSAhPSAnJyApe1xuXHRcdFx0dGhpcy5zZXREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm4pe1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG5cdH1cblx0XG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xuXHR9XG5cdHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblx0Ly9cdC4vREVGQVVMVCBETyBGT1JNQlVJTERFUlxuIFxuXHRcblxuXG5cdG9uQ2xlYXJDbGljaygpe1xuXHRcdFxuXHRcdHRoaXMuc2VhcmNoU3RyaW5nIFx0XHQ9ICcnO1xuXHRcdHRoaXMuY29uZmlnc1snc2VhcmNoJ11cdD0gJyc7XG5cdFx0dGhpcy52YWx1ZSA9ICcnO1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMudmFsdWUpOyAgIFxuXHR9XG5cblxuXG5cblxuXG5cdHNldERlZmF1bHQoKXtcblx0XHRsZXQgZmlsdHJvID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZ3MpKTtcblx0XHRsZXQgdXJsIFx0XHRcdD0gZmlsdHJvWydzZXJ2aWNlJ107XG5cdFx0ZmlsdHJvWydsaW1pdCddIFx0PSAxO1xuXHRcdGZpbHRyb1snb2Zmc2V0J10gXHQ9IDA7XG5cdFx0ZmlsdHJvWyB0aGlzLmNvbmZpZ3NbJ2tleSddIF0gPSB0aGlzLmRlZmF1bHRWYWx1ZTtcblx0XHRkZWxldGUgZmlsdHJvWydzZXJ2aWNlJ107XG5cdFx0ZGVsZXRlIGZpbHRyb1sna2V5J107XG5cdFx0ZGVsZXRlIGZpbHRyb1sndGV4dCddO1xuXHRcdGxldCBwYXIgID0gbmV3IEh0dHBQYXJhbXMoeyBmcm9tT2JqZWN0OiBmaWx0cm8gfSk7XG5cdFx0dXJsICs9IHVybC5pbmNsdWRlcyhcIj9cIikgPyAoJyYnK3BhcikgOiAoJz8nK3Bhcik7IFxuXHRcdHRoaXMuaHR0cENsaWVudC5nZXQoIHVybCApLnN1YnNjcmliZSggcmVzID0+IHtcblx0XHRcdGlmKCByZXNbJ2RhdGEnXSAhPSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShyZXNbJ2RhdGEnXSkgJiYgcmVzWydkYXRhJ10ubGVuZ3RoID4gMCApe1xuXHRcdFx0XHRsZXQgZGVmYXVsdE9iaiA9IHJlc1snZGF0YSddWzBdO1xuXHRcdFx0XHRpZiggZGVmYXVsdE9iaiAhPSB1bmRlZmluZWQgKXtcblx0XHRcdFx0XHR0aGlzLnNlYXJjaFN0cmluZyA9IGRlZmF1bHRPYmpbIHRoaXMuY29uZmlnc1sndGV4dCddIF07XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5pbnB1dGNvbXBvbmVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRoaXMucmVhZG9ubHkgKTsgLy9BcGVuYXMgZnVuY2lvbmEgbm8gZWRpdGFyLCBubyBhZGljaW9uYXIgbsOjbyBtZXRlIGRlZmF1bHQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXG5cdG9uVHlwZVNlYXJjaElucHV0KCl7XG5cdFx0aWYoIHRoaXMua2V5dXBEZWxheSApe1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMua2V5dXBEZWxheSk7XG5cdFx0fVxuXHRcdHRoaXMua2V5dXBEZWxheSA9IHNldFRpbWVvdXQoKCk9PnsgXG5cdFx0XHR0aGlzLmNvbmZpZ3NbJ3NlYXJjaCddXHRcdD0gKHRoaXMuc2VhcmNoU3RyaW5nIHx8ICcnKTtcblx0XHRcdHRoaXMuc2VhcmNoU2VsZWN0U2VydmljZS50eXBlU2VhcmNoKCk7IFxuXHRcdFx0dGhpcy5rZXl1cERlbGF5ID0gdW5kZWZpbmVkO1xuXHRcdH0sIDUwMCk7XG5cdH1cblxuXG5cdFxuXG5cblx0cHVibGljIG92ZXJsYXlSZWY7XG5cdHB1YmxpYyBjb21wUmVmO1xuXHR0b2dnbGVTZWxlY3QoIGFjdCApe1xuXHRcdC8vIGxldCB0b3AgPSAoIHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkgPCAyNTAgPyBmYWxzZSA6IHRydWU7XG5cdFx0Y29uc3QgcG9zaXRpb25TdHJhdGVneSA9ICB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5jb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXG5cdFx0XHR7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH0sIFxuXHRcdFx0Ly8geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICh0b3AgPyAndG9wJyA6ICdib3R0b20nKSB9XG5cdFx0XHR7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfVxuXHRcdCk7XG5cblx0XHR0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcblx0XHRcdHBvc2l0aW9uU3RyYXRlZ3k6IHBvc2l0aW9uU3RyYXRlZ3ksICBcblx0XHRcdGhhc0JhY2tkcm9wOiBmYWxzZSxcblx0XHRcdC8vIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpLCBcblx0XHR9KTtcblx0XHRjb25zdCBjb21wb25lbnQgXHRcdD0gbmV3IENvbXBvbmVudFBvcnRhbChPcHRpb25zQ29tcG9uZW50KTtcblx0XHRjb25zdCBjb21wUmVmOiBDb21wb25lbnRSZWY8T3B0aW9uc0NvbXBvbmVudD4gPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKGNvbXBvbmVudCk7XG5cdFx0Y29tcFJlZi5pbnN0YW5jZS53aWR0aCBcdFx0PSAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1swXS5jbGllbnRXaWR0aDtcblx0XHRjb21wUmVmLmluc3RhbmNlLmNvbmZpZ3MgXHQ9ICB0aGlzLmNvbmZpZ3M7XG5cdFx0Y29tcFJlZi5pbnN0YW5jZS5vblJldHVybkRhdGEgPSAob3B0KT0+eyBcblx0XHRcdGlmKCBvcHRbIHRoaXMuY29uZmlnc1sna2V5J10gXSAhPSB1bmRlZmluZWQgKXtcblx0XHRcdFx0dGhpcy5zZWFyY2hTdHJpbmcgPSBvcHRbIHRoaXMuY29uZmlnc1sndGV4dCddIF07XG5cdFx0XHRcdHRoaXMudmFsdWUgPSBvcHRbIHRoaXMuY29uZmlnc1sna2V5J10gXTtcblx0XHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSk7IFxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2VhcmNoU3RyaW5nIFx0XHQ9ICcnO1xuXHRcdFx0XHR0aGlzLmNvbmZpZ3NbJ3NlYXJjaCddXHQ9ICcnO1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gJyc7XG5cdFx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMudmFsdWUpOyAgIFxuXHRcdFx0fSBcblx0XHRcdFxuXHRcdFx0c2V0VGltZW91dCgoKT0+eyBcblx0XHRcdFx0dGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcblx0XHRcdH0sIDEwMCk7XG5cdFx0fVxuXHRcdHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7ICBcblx0XHR9KTtcblx0fVxuXG5cblxuXHRpbnB1dEZvY3VzRnVuY3Rpb24oIGV2ICl7XG5cdFx0dGhpcy50b2dnbGVTZWxlY3QoIHRydWUgKTtcblx0XHR0aGlzLm9uVG91Y2hlZCAmJiB0aGlzLm9uVG91Y2hlZCgpO1xuXHR9XG5cblxuXHQvL0NMT1NFIFdIRU4gQ0xJQ0sgT1VUU0lERVxuXHRASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZWRvd24nLCBbJyRldmVudCddKVxuXHRvbkdsb2JhbENsaWNrKGV2ZW50KTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57IFxuXHRcdFx0XHRpZiggdGhpcy5vdmVybGF5UmVmICE9IHVuZGVmaW5lZCApe1xuXHRcdFx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDMwMCk7XG5cdFx0fVxuXHR9XG5cdFxuXHRcblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcblx0XHRcdGlmKCB0aGlzLm92ZXJsYXlSZWYgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdHRoaXMuaW5wdXRjb21wb25lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKT0+e1xuXHRcdCAgIGlmKCB0aGlzLm92ZXJsYXlSZWYgIT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdHRoaXMuaW5wdXRjb21wb25lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0XHRcdHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG5cdFx0XHR9XG5cdFx0fSwgZmFsc2UpO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdFxuXHR9XG5cdFxuXHRcblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0aWYoIHRoaXMub3ZlcmxheVJlZiAhPSB1bmRlZmluZWQgKXtcblx0XHRcdHRoaXMuaW5wdXRjb21wb25lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0XHR0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuXHRcdH1cblx0fVxuXHRcblx0XG5cdCAgXG5cdFxufVxuIl19