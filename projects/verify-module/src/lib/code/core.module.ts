import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanVcComponent } from './components/scan-vc/scan-vc.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxScannerQrcodeModule} from 'ngx-scanner-qrcode'

@NgModule({
  declarations: [ScanVcComponent
  ],
  imports: [
    CommonModule,
    ZXingScannerModule,
    NgxScannerQrcodeModule
  ],
  exports: [ScanVcComponent]
})
export class CoreModule { }
