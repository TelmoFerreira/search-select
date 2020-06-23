import { HttpClient } from '@angular/common/http';
import { SearchSelectService } from '../search-select.service';
export declare class OptionsComponent {
    private httpClient;
    searchSelectService: SearchSelectService;
    width: number;
    configs: {};
    private desconto;
    semResultados: boolean;
    mainArray: any[];
    disableScrollDetect: boolean;
    onReturnData: any;
    constructor(httpClient: HttpClient, searchSelectService: SearchSelectService);
    onClickOption(opt: any): void;
    loadMore(): void;
    onScroll(ev: any): void;
    ngOnInit(): void;
}
