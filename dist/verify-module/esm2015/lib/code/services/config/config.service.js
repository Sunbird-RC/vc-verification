import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../verify-module.service";
export class ConfigService {
    constructor(verifyLibraryService) {
        this.verifyLibraryService = verifyLibraryService;
    }
    getConfigUrl() {
        return this.verifyLibraryService.configData;
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(i0.ɵɵinject(i1.VerifyLibraryService)); };
ConfigService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ConfigService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.VerifyLibraryService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGVsbC9Eb2N1bWVudHMvU0RrL1ZDLVZlcmlmeS1MaWJyYXJ5L1ZjLVZlcmlmeS9wcm9qZWN0cy92ZXJpZnktbW9kdWxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb2RlL3NlcnZpY2VzL2NvbmZpZy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLGFBQWE7SUFFeEIsWUFBbUIsb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFBSSxDQUFDO0lBRWxFLFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQzs7MEVBTlUsYUFBYTtxREFBYixhQUFhLFdBQWIsYUFBYSxtQkFGWixNQUFNO2tEQUVQLGFBQWE7Y0FIekIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmVyaWZ5TGlicmFyeVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi92ZXJpZnktbW9kdWxlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmVyaWZ5TGlicmFyeVNlcnZpY2U6IFZlcmlmeUxpYnJhcnlTZXJ2aWNlKSB7IH1cblxuICBnZXRDb25maWdVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5TGlicmFyeVNlcnZpY2UuY29uZmlnRGF0YTtcbiAgfVxuXG4gIFxufVxuIl19