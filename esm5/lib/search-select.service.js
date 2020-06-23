import { __decorate, __metadata } from "tslib";
import { Injectable, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
var SearchSelectService = /** @class */ (function () {
    function SearchSelectService() {
        this.onTypeSearch = new EventEmitter();
    }
    SearchSelectService.prototype.typeSearch = function () {
        this.onTypeSearch.emit();
    };
    SearchSelectService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SearchSelectService_Factory() { return new SearchSelectService(); }, token: SearchSelectService, providedIn: "root" });
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
export { SearchSelectService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2VhcmNoLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gtc2VsZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLakU7SUFLQztRQUhVLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUc1QixDQUFDO0lBSWpCLHdDQUFVLEdBQVY7UUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFCLENBQUM7O0lBVlM7UUFBVCxNQUFNLEVBQUU7OzZEQUFtQztJQUZoQyxtQkFBbUI7UUFIL0IsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQzs7T0FDVyxtQkFBbUIsQ0FtQi9COzhCQXhCRDtDQXdCQyxBQW5CRCxJQW1CQztTQW5CWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZWxlY3RTZXJ2aWNlIHtcblx0XG5cdEBPdXRwdXQoKSBvblR5cGVTZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdFxuXHRcblx0Y29uc3RydWN0b3IoKSB7IH1cbiAgXG4gIFxuICBcblx0dHlwZVNlYXJjaCgpe1xuXHRcdHRoaXMub25UeXBlU2VhcmNoLmVtaXQoKTtcblx0XHRcblx0fVxuICBcbiAgXG4gIFxuICBcbiAgXG4gIFxufVxuIl19