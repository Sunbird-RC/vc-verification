import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanVcComponent } from './components/scan-vc/scan-vc.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [ScanVcComponent
  ],
  imports: [
    CommonModule,
    ZXingScannerModule
  ],
  exports: [ScanVcComponent]
})
export class CoreModule { }
