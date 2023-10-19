import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'sb-vc-verification',
  templateUrl: './scan-vc.component.html',
  styleUrls: ['./scan-vc.component.css']
})
export class ScanVcComponent implements OnInit {
   @Input() item: any;

  constructor(public verifyService: VerifyService) {
    
  }

  ngOnInit(): void {
  }

  ngOnChanges()
  {
    this.item['scanner_type'] = 'ZXING_QRCODE';
  }

  scanHandler($event: any) {
    let self = this;
    this.verifyService.scanSuccessHandler($event, this.item).then((res)=>{
      setTimeout(() => {
          // this.action.stop();
      }, 1000);
    }, (err)=>{
      setTimeout(() => {
        // this.action.stop();
    }, 1000);
    });
  }

  openScanner() {
    this.verifyService.enableScanner();
  }


}

