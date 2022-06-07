import { Component } from '@angular/core';
import {VerifyService } from '../../projects/verify-module/src/lib/code/services/verify/verify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vc-Verify';

  constructor(public verifyService: VerifyService){
    
  
// let ob = verifyService.demo();


  }

  scanHandler(event)
  {
    this.verifyService.scanSuccessHandler(event).then((res)=>{
      console.log({res});
    });

  }


  openScanner() {
    this.verifyService.enableScanner();
 
   }
}
