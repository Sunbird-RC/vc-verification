import { NgModule, ModuleWithProviders } from '@angular/core';
import { VerifyModuleComponent } from './verify-module.component';
import { VerifyLibraryService } from './verify-module.service';

import { CoreModule } from './code/core.module';

@NgModule({
  declarations: [VerifyModuleComponent, 
    //VerifyComponent, 
  ],
  imports: [
    CoreModule
  ],
  exports: [VerifyModuleComponent, CoreModule]
})


export class VerifyModule {
  public static forChild(config: any): ModuleWithProviders<VerifyModule> {
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
