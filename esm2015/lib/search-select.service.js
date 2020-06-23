import { __decorate, __metadata } from "tslib";
import { Injectable, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
let SearchSelectService = class SearchSelectService {
    constructor() {
        this.onTypeSearch = new EventEmitter();
    }
    typeSearch() {
        this.onTypeSearch.emit();
    }
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
export { SearchSelectService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNlbGVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2VhcmNoLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gtc2VsZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLakUsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFLL0I7UUFIVSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFHNUIsQ0FBQztJQUlqQixVQUFVO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUUxQixDQUFDO0NBT0QsQ0FBQTs7QUFqQlU7SUFBVCxNQUFNLEVBQUU7O3lEQUFtQztBQUZoQyxtQkFBbUI7SUFIL0IsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQzs7R0FDVyxtQkFBbUIsQ0FtQi9CO1NBbkJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlbGVjdFNlcnZpY2Uge1xuXHRcblx0QE91dHB1dCgpIG9uVHlwZVNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0XG5cdFxuXHRjb25zdHJ1Y3RvcigpIHsgfVxuICBcbiAgXG4gIFxuXHR0eXBlU2VhcmNoKCl7XG5cdFx0dGhpcy5vblR5cGVTZWFyY2guZW1pdCgpO1xuXHRcdFxuXHR9XG4gIFxuICBcbiAgXG4gIFxuICBcbiAgXG59XG4iXX0=