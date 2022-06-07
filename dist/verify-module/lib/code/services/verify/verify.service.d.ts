import { ConfigService } from '../config/config.service';
import * as i0 from "@angular/core";
export declare class VerifyService {
    configService: ConfigService;
    scannerEnabled: boolean;
    success: boolean;
    qrString: any;
    item: any;
    loader: boolean;
    notValid: boolean;
    name: any;
    items: any;
    document: any[];
    excludedFields: any;
    configData: any;
    constructor(configService: ConfigService);
    ngOnInit(): void;
    enableScanner(): void;
    scanSuccessHandler($event: any): Promise<unknown>;
    readData(res: any): void;
    static ɵfac: i0.ɵɵFactoryDef<VerifyService, never>;
    static ɵprov: i0.ɵɵInjectableDef<VerifyService>;
}
//# sourceMappingURL=verify.service.d.ts.map