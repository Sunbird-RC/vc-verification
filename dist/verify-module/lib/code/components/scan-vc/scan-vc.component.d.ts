import { OnInit } from '@angular/core';
import { VerifyService } from '../../services/verify/verify.service';
import * as i0 from "@angular/core";
export declare class ScanVcComponent implements OnInit {
    verifyService: VerifyService;
    item: any;
    constructor(verifyService: VerifyService);
    ngOnInit(): void;
    scanHandler($event: any): void;
    openScanner(): void;
    static ɵfac: i0.ɵɵFactoryDef<ScanVcComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ScanVcComponent, "lib-scan-vc", never, { "item": "item"; }, {}, never, never>;
}
//# sourceMappingURL=scan-vc.component.d.ts.map