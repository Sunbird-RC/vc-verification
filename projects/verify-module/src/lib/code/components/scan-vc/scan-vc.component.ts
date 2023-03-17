import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {  ScannerQRCodeConfig,
  NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'sb-vc-verification',
  templateUrl: './scan-vc.component.html',
  styleUrls: ['./scan-vc.component.css']
})
export class ScanVcComponent implements OnInit {
   @Input() item: any;

  //item = [];
  @ViewChild('action') action: NgxScannerQrcodeComponent;
  public config: ScannerQRCodeConfig = {
    vibrate: 400,
     isBeep: false,
     deviceActive :  1
  }
  constructor(public verifyService: VerifyService) {
   // this.item['scanner_type'] = 'ZBAR_QRCODE'
  }

  ngOnInit(): void {
  }

  scanHandler($event: any) {
    let self = this;
    this.verifyService.scanSuccessHandler($event, this.item).then((res)=>{
      setTimeout(() => {
          this.action.stop();
      }, 1000);
    }, (err)=>{
      setTimeout(() => {
        this.action.stop();
    }, 1000);
    });
  }

  openScanner() {

    if (this.item && this.item.hasOwnProperty('scanner_type') && this.item['scanner_type'] == 'ZBAR_QRCODE') {
      setTimeout(() => {
        if (this.action.isStart) {
          this.action.stop();
        } else {
          this.action.start();
        }
  
      }, 500);
    }
    this.verifyService.enableScanner();
  }


}

