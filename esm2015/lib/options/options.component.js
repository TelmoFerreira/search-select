import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchSelectService } from '../search-select.service';
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
export { OptionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZWFyY2gtc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL29wdGlvbnMvb3B0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBQyxVQUFVLEVBQUUsTUFBTyxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTywwQkFBMEIsQ0FBQztBQU1oRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWU1QixZQUFxQixVQUFzQixFQUFTLG1CQUF5QztRQUF4RSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQWJ0RixVQUFLLEdBQUksR0FBRyxDQUFDO1FBQ2IsWUFBTyxHQUFJLEVBQUUsQ0FBQztRQUdiLGFBQVEsR0FBSyxHQUFHLENBQUM7UUFDekIsNkJBQTZCO1FBQ3RCLGtCQUFhLEdBQUksS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFNbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUdELGFBQWEsQ0FBQyxHQUFHO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDMUIsQ0FBQztJQUtELFFBQVE7UUFDUCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLEdBQUcsR0FBTSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFJLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDMUMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsSUFBSSxHQUFHLEdBQUksSUFBSSxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRCxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBRSxDQUFDLFNBQVMsQ0FBRSxHQUFHLENBQUMsRUFBRTtZQUMzQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztnQkFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFJO2dCQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBSUQsUUFBUSxDQUFDLEVBQUU7UUFDVixJQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFLElBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRztZQUNoSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDaEI7SUFDRixDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBRUQsQ0FBQTs7WUFqRGlDLFVBQVU7WUFBK0IsbUJBQW1COztBQWZqRixnQkFBZ0I7SUFMNUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsdVZBQXVDOztLQUV4QyxDQUFDO3FDQWdCZ0MsVUFBVSxFQUErQixtQkFBbUI7R0FmakYsZ0JBQWdCLENBZ0U1QjtTQWhFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCxIdHRwUGFyYW1zIH0gXHRmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTZWFyY2hTZWxlY3RTZXJ2aWNlIH0gXHRmcm9tICcuLi9zZWFyY2gtc2VsZWN0LnNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LW9wdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vb3B0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL29wdGlvbnMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50e1xuXHRcblx0cHVibGljIHdpZHRoIFx0PSA1MDA7XG5cdHB1YmxpYyBjb25maWdzIFx0PSB7fTtcblxuXG5cdHByaXZhdGUgZGVzY29udG8gXHRcdD0gODAwO1xuXHQvLyBwdWJsaWMgc2VhcmNoU3RyaW5nIFx0PSAnJztcblx0cHVibGljIHNlbVJlc3VsdGFkb3MgXHQ9IGZhbHNlO1xuXHRwdWJsaWMgbWFpbkFycmF5ID0gW107XG5cdHB1YmxpYyBkaXNhYmxlU2Nyb2xsRGV0ZWN0ID0gZmFsc2U7XG5cdFxuXHRwdWJsaWMgb25SZXR1cm5EYXRhO1xuXG5cblx0Y29uc3RydWN0b3IoIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHVibGljIHNlYXJjaFNlbGVjdFNlcnZpY2UgOiBTZWFyY2hTZWxlY3RTZXJ2aWNlICkge1xuXHRcdHRoaXMuc2VhcmNoU2VsZWN0U2VydmljZS5vblR5cGVTZWFyY2guc3Vic2NyaWJlKCByZXMgPT4ge1xuXHRcdFx0dGhpcy5tYWluQXJyYXkgPSBbXTtcblx0XHRcdHRoaXMubG9hZE1vcmUoKTtcblx0XHR9KTtcdFxuXHR9XG5cdFxuXHRcblx0b25DbGlja09wdGlvbihvcHQpe1xuXHRcdHRoaXMub25SZXR1cm5EYXRhKCBvcHQgKTtcblx0fVxuXHRcbiBcblx0XG5cblx0bG9hZE1vcmUoKXtcblx0XHR0aGlzLnNlbVJlc3VsdGFkb3MgPSBmYWxzZTtcblx0XHR0aGlzLmRpc2FibGVTY3JvbGxEZXRlY3QgPSB0cnVlO1xuXHRcdGxldCBmaWx0cm8gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlncykpO1xuXHRcdGxldCB1cmwgXHRcdFx0PSBmaWx0cm9bJ3NlcnZpY2UnXTtcblx0XHRmaWx0cm9bJ2xpbWl0J10gXHQ9IDUwO1xuXHRcdGZpbHRyb1snb2Zmc2V0J10gXHQ9IHRoaXMubWFpbkFycmF5Lmxlbmd0aDtcblx0XHRkZWxldGUgZmlsdHJvWydzZXJ2aWNlJ107XG5cdFx0ZGVsZXRlIGZpbHRyb1sna2V5J107XG5cdFx0ZGVsZXRlIGZpbHRyb1sndGV4dCddO1xuXHRcdGxldCBwYXIgID0gbmV3IEh0dHBQYXJhbXMoeyBmcm9tT2JqZWN0OiBmaWx0cm8gfSk7XG5cdFx0dXJsICs9IHVybC5pbmNsdWRlcyhcIj9cIikgPyAoJyYnK3BhcikgOiAoJz8nK3Bhcik7IFxuXHRcdHRoaXMuaHR0cENsaWVudC5nZXQoIHVybCApLnN1YnNjcmliZSggcmVzID0+IHtcblx0XHRcdGlmKCByZXNbJ2RhdGEnXSAhPSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShyZXNbJ2RhdGEnXSkgJiYgcmVzWydkYXRhJ10ubGVuZ3RoID4gMCApe1xuXHRcdFx0XHR0aGlzLmRpc2FibGVTY3JvbGxEZXRlY3QgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5tYWluQXJyYXkgPSBbLi4udGhpcy5tYWluQXJyYXksIC4uLnJlc1snZGF0YSddXTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNlbVJlc3VsdGFkb3MgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9ICBcblx0XG5cdFxuXHRcblx0b25TY3JvbGwoZXYpe1xuXHRcdGlmICggIXRoaXMuZGlzYWJsZVNjcm9sbERldGVjdCAmJiAoKGV2LnRhcmdldC5vZmZzZXRIZWlnaHQgKyBldi50YXJnZXQuc2Nyb2xsVG9wICsgdGhpcy5kZXNjb250byApICA+PSBldi50YXJnZXQuc2Nyb2xsSGVpZ2h0KSApIHtcblx0XHRcdHRoaXMubG9hZE1vcmUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLmxvYWRNb3JlKCk7XG5cdH1cblxufVxuIl19