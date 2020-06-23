import { __decorate, __metadata, __read, __spread } from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchSelectService } from '../search-select.service';
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
export { OptionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZWFyY2gtc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL29wdGlvbnMvb3B0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBQyxVQUFVLEVBQUUsTUFBTyxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTywwQkFBMEIsQ0FBQztBQU1oRTtJQWVDLDBCQUFxQixVQUFzQixFQUFTLG1CQUF5QztRQUE3RixpQkFLQztRQUxvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQWJ0RixVQUFLLEdBQUksR0FBRyxDQUFDO1FBQ2IsWUFBTyxHQUFJLEVBQUUsQ0FBQztRQUdiLGFBQVEsR0FBSyxHQUFHLENBQUM7UUFDekIsNkJBQTZCO1FBQ3RCLGtCQUFhLEdBQUksS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFNbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUUsVUFBQSxHQUFHO1lBQ25ELEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFHRCx3Q0FBYSxHQUFiLFVBQWMsR0FBRztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFLRCxtQ0FBUSxHQUFSO1FBQUEsaUJBb0JDO1FBbkJBLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksR0FBRyxHQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUksRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLEdBQUcsR0FBSSxJQUFJLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLENBQUMsU0FBUyxDQUFFLFVBQUEsR0FBRztZQUN4QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckYsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztnQkFDakMsS0FBSSxDQUFDLFNBQVMsWUFBTyxLQUFJLENBQUMsU0FBUyxFQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFJO2dCQUNKLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBSUQsbUNBQVEsR0FBUixVQUFTLEVBQUU7UUFDVixJQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFLElBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRztZQUNoSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDaEI7SUFDRixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDOztnQkEvQ2dDLFVBQVU7Z0JBQStCLG1CQUFtQjs7SUFmakYsZ0JBQWdCO1FBTDVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLHVWQUF1Qzs7U0FFeEMsQ0FBQzt5Q0FnQmdDLFVBQVUsRUFBK0IsbUJBQW1CO09BZmpGLGdCQUFnQixDQWdFNUI7SUFBRCx1QkFBQztDQUFBLEFBaEVELElBZ0VDO1NBaEVZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LEh0dHBQYXJhbXMgfSBcdGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNlYXJjaFNlbGVjdFNlcnZpY2UgfSBcdGZyb20gJy4uL3NlYXJjaC1zZWxlY3Quc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtb3B0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcHRpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9ucy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE9wdGlvbnNDb21wb25lbnR7XG5cdFxuXHRwdWJsaWMgd2lkdGggXHQ9IDUwMDtcblx0cHVibGljIGNvbmZpZ3MgXHQ9IHt9O1xuXG5cblx0cHJpdmF0ZSBkZXNjb250byBcdFx0PSA4MDA7XG5cdC8vIHB1YmxpYyBzZWFyY2hTdHJpbmcgXHQ9ICcnO1xuXHRwdWJsaWMgc2VtUmVzdWx0YWRvcyBcdD0gZmFsc2U7XG5cdHB1YmxpYyBtYWluQXJyYXkgPSBbXTtcblx0cHVibGljIGRpc2FibGVTY3JvbGxEZXRlY3QgPSBmYWxzZTtcblx0XG5cdHB1YmxpYyBvblJldHVybkRhdGE7XG5cblxuXHRjb25zdHJ1Y3RvciggcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBwdWJsaWMgc2VhcmNoU2VsZWN0U2VydmljZSA6IFNlYXJjaFNlbGVjdFNlcnZpY2UgKSB7XG5cdFx0dGhpcy5zZWFyY2hTZWxlY3RTZXJ2aWNlLm9uVHlwZVNlYXJjaC5zdWJzY3JpYmUoIHJlcyA9PiB7XG5cdFx0XHR0aGlzLm1haW5BcnJheSA9IFtdO1xuXHRcdFx0dGhpcy5sb2FkTW9yZSgpO1xuXHRcdH0pO1x0XG5cdH1cblx0XG5cdFxuXHRvbkNsaWNrT3B0aW9uKG9wdCl7XG5cdFx0dGhpcy5vblJldHVybkRhdGEoIG9wdCApO1xuXHR9XG5cdFxuIFxuXHRcblxuXHRsb2FkTW9yZSgpe1xuXHRcdHRoaXMuc2VtUmVzdWx0YWRvcyA9IGZhbHNlO1xuXHRcdHRoaXMuZGlzYWJsZVNjcm9sbERldGVjdCA9IHRydWU7XG5cdFx0bGV0IGZpbHRybyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5jb25maWdzKSk7XG5cdFx0bGV0IHVybCBcdFx0XHQ9IGZpbHRyb1snc2VydmljZSddO1xuXHRcdGZpbHRyb1snbGltaXQnXSBcdD0gNTA7XG5cdFx0ZmlsdHJvWydvZmZzZXQnXSBcdD0gdGhpcy5tYWluQXJyYXkubGVuZ3RoO1xuXHRcdGRlbGV0ZSBmaWx0cm9bJ3NlcnZpY2UnXTtcblx0XHRkZWxldGUgZmlsdHJvWydrZXknXTtcblx0XHRkZWxldGUgZmlsdHJvWyd0ZXh0J107XG5cdFx0bGV0IHBhciAgPSBuZXcgSHR0cFBhcmFtcyh7IGZyb21PYmplY3Q6IGZpbHRybyB9KTtcblx0XHR1cmwgKz0gdXJsLmluY2x1ZGVzKFwiP1wiKSA/ICgnJicrcGFyKSA6ICgnPycrcGFyKTsgXG5cdFx0dGhpcy5odHRwQ2xpZW50LmdldCggdXJsICkuc3Vic2NyaWJlKCByZXMgPT4ge1xuXHRcdFx0aWYoIHJlc1snZGF0YSddICE9IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHJlc1snZGF0YSddKSAmJiByZXNbJ2RhdGEnXS5sZW5ndGggPiAwICl7XG5cdFx0XHRcdHRoaXMuZGlzYWJsZVNjcm9sbERldGVjdCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLm1haW5BcnJheSA9IFsuLi50aGlzLm1haW5BcnJheSwgLi4ucmVzWydkYXRhJ11dO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2VtUmVzdWx0YWRvcyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gIFxuXHRcblx0XG5cdFxuXHRvblNjcm9sbChldil7XG5cdFx0aWYgKCAhdGhpcy5kaXNhYmxlU2Nyb2xsRGV0ZWN0ICYmICgoZXYudGFyZ2V0Lm9mZnNldEhlaWdodCArIGV2LnRhcmdldC5zY3JvbGxUb3AgKyB0aGlzLmRlc2NvbnRvICkgID49IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQpICkge1xuXHRcdFx0dGhpcy5sb2FkTW9yZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMubG9hZE1vcmUoKTtcblx0fVxuXG59XG4iXX0=