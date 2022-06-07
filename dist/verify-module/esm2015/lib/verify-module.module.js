import { NgModule } from '@angular/core';
import { VerifyModuleComponent } from './verify-module.component';
import { VerifyLibraryService } from './verify-module.service';
import { CoreModule } from './code/core.module';
import * as i0 from "@angular/core";
export class VerifyModule {
    static forChild(config) {
        return {
            ngModule: VerifyModule,
            providers: [
                VerifyLibraryService,
                {
                    provide: "vcConfig",
                    useValue: config
                }
            ]
        };
    }
}
VerifyModule.ɵmod = i0.ɵɵdefineNgModule({ type: VerifyModule });
VerifyModule.ɵinj = i0.ɵɵdefineInjector({ factory: function VerifyModule_Factory(t) { return new (t || VerifyModule)(); }, imports: [[
            CoreModule
        ], CoreModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VerifyModule, { declarations: [VerifyModuleComponent], imports: [CoreModule], exports: [VerifyModuleComponent, CoreModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VerifyModule, [{
        type: NgModule,
        args: [{
                declarations: [VerifyModuleComponent,
                ],
                imports: [
                    CoreModule
                ],
                exports: [VerifyModuleComponent, CoreModule]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LW1vZHVsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGVsbC9Eb2N1bWVudHMvU0RrL1ZDLVZlcmlmeS1MaWJyYXJ5L1ZjLVZlcmlmeS9wcm9qZWN0cy92ZXJpZnktbW9kdWxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi92ZXJpZnktbW9kdWxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBYWhELE1BQU0sT0FBTyxZQUFZO0lBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBVztRQUNoQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULG9CQUFvQjtnQkFDcEI7b0JBQ0UsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dEQVpVLFlBQVk7dUdBQVosWUFBWSxrQkFQZDtZQUNQLFVBQVU7U0FDWCxFQUNnQyxVQUFVO3dGQUloQyxZQUFZLG1CQVZSLHFCQUFxQixhQUlsQyxVQUFVLGFBRUYscUJBQXFCLEVBQUUsVUFBVTtrREFJaEMsWUFBWTtjQVh4QixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCO2lCQUVuQztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsVUFBVTtpQkFDWDtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLENBQUM7YUFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmVyaWZ5TW9kdWxlQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJpZnktbW9kdWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZXJpZnlMaWJyYXJ5U2VydmljZSB9IGZyb20gJy4vdmVyaWZ5LW1vZHVsZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJy4vY29kZS9jb3JlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1ZlcmlmeU1vZHVsZUNvbXBvbmVudCwgXG4gICAgLy9WZXJpZnlDb21wb25lbnQsIFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbVmVyaWZ5TW9kdWxlQ29tcG9uZW50LCBDb3JlTW9kdWxlXVxufSlcblxuXG5leHBvcnQgY2xhc3MgVmVyaWZ5TW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChjb25maWc6IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VmVyaWZ5TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBWZXJpZnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVmVyaWZ5TGlicmFyeVNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBcInZjQ29uZmlnXCIsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxuIH1cbiJdfQ==