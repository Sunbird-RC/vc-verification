import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanVcComponent } from './components/scan-vc/scan-vc.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import * as i0 from "@angular/core";
export class CoreModule {
}
CoreModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
            CommonModule,
            ZXingScannerModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CoreModule, { declarations: [ScanVcComponent], imports: [CommonModule,
        ZXingScannerModule], exports: [ScanVcComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CoreModule, [{
        type: NgModule,
        args: [{
                declarations: [ScanVcComponent
                ],
                imports: [
                    CommonModule,
                    ZXingScannerModule
                ],
                exports: [ScanVcComponent]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGVsbC9Eb2N1bWVudHMvU0RrL1ZDLVZlcmlmeS1MaWJyYXJ5L1ZjLVZlcmlmeS9wcm9qZWN0cy92ZXJpZnktbW9kdWxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb2RlL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFZeEQsTUFBTSxPQUFPLFVBQVU7OzhDQUFWLFVBQVU7bUdBQVYsVUFBVSxrQkFOWjtZQUNQLFlBQVk7WUFDWixrQkFBa0I7U0FDbkI7d0ZBR1UsVUFBVSxtQkFSTixlQUFlLGFBRzVCLFlBQVk7UUFDWixrQkFBa0IsYUFFVixlQUFlO2tEQUVkLFVBQVU7Y0FUdEIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGVBQWU7aUJBQzdCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTY2FuVmNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2Nhbi12Yy9zY2FuLXZjLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBaWGluZ1NjYW5uZXJNb2R1bGUgfSBmcm9tICdAenhpbmcvbmd4LXNjYW5uZXInO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1NjYW5WY0NvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFpYaW5nU2Nhbm5lck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbU2NhblZjQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDb3JlTW9kdWxlIHsgfVxuIl19