import { Component, OnInit, Input } from '@angular/core';
import { VerifyService } from '../../services/verify/verify.service';

@Component({
  selector: 'lib-scan-vc',
  templateUrl: './scan-vc.component.html',
  styleUrls: ['./scan-vc.component.css']
})
export class ScanVcComponent implements OnInit {
  @Input() item: any;
  


   constructor(public verifyService : VerifyService) { 

   }
 
   ngOnInit(): void {
    /* { 
      verify_certificate = 'Verify Certificate',
     scan_qrcode = 'Scan QR Code'
      detecting_qrcode = 'Detecting QR code'
      back = 'Back'
      certificate_isverified = 'Certificate is verified'
      verify_another_Certificate = 'Verify another Certificate'
      cetificate_not_valid = 'This Certificate is not valid'
      }*/
   }
 
   scanHandler($event: any) 
   {
     this.verifyService.scanSuccessHandler($event);
   }
 

   openScanner() {
    console.log(this.item);

    this.verifyService.enableScanner();
 
   }
}

