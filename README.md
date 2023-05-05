# **Sunbird VC Verification**


The module is developed for scanning the QR(Quick Response) codes inside your Angular applications. This library are designed to be used in sunbird RC platforms.

To use this module you need to follow a few steps.

1. Install *vc-verification* npm package in your angular project. Using below command

|`npm i vc-verification`|
| :- |



2. You need to install the @zxing/ngx-scanner npm module. Before install this npm module you need to check your angular compatible version with this package version. You can check the details below too.

Run cmd - 


|`npm i @zxing/ngx-scanner@vx.x.x`|
| :- |



|**Angular Version**|**Ngx-scanner version**|
| :- | :- |
|Angular  9.0.0 <10|v3.0.0, v3.0.1|
|Angular 10.1.5|v3.1.0, v3.1.1, v3.1.2, v3.1.3|
|Angular 11.2.11, 12.0.4|v3.2.0,  v3.3.0|
|Angular 11.2.11, 12.0.4, 13.0.0|v3.4.2, v3.5.0|

For more detail about compatible version you can check this doc - <https://www.npmpeer.dev/packages/@zxing/ngx-scanner/compatibility>

3. Add below CND link in index.html file
```
  <script src="https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.12/dist/index.js"></script>
  ```


4. Import **vc-verification** and **@zxing/ngx-scanner** library in your **app.module.ts** file


|<p>import { VerifyModule } from 'vc-verification';</p><p>import { ZXingScannerModule } from '@zxing/ngx-scanner';</p><p>import \* as configData from '../assets/config.json';  // Read config from .json file</p><p></p><p>Or</p><p>// Add configuration in app.module.ts file</p><p>const configData = {</p><p>baseUrl: "assets/api/event-detail.json",</p><p>}</p><p></p><p></p><p>@NgModule({</p><p>declarations: [</p><p>AppComponent</p><p>],</p><p>imports: [</p><p>.....</p><p>......</p><p>VerifyModule.forChild(configData),  < —</p><p>ZXingScannerModule, < —</p><p>.....</p><p>......</p><p>],</p><p>providers: [],</p><p>bootstrap: [AppComponent]</p><p>})</p><p></p><p>export class AppModule { }</p><p></p>|
| :- |



i)  Anyone can use the Default Scan template using sb-vc-verify selector or he/she can use only verify service too. 

Add below code in your ***app.component.html*** file

|`<sb-vc-verification> </sb-vc-verification>`|
| :- |


ii)  If anyone wants to change labels and messages from template. You can pass it through **item** property.

app.component.html

|`<sb-vc-verification [item]="itemData"></sb-vc-verification>`|
| :- |



*App.component.ts :* Change the value of key


|<p>this.itemData = </p><p>{</p><p>"scanNote”:”To verify any eLocker document, simply scan the QR code that's on the document.”,</p><p>"verify\_certificate": 'Verify Certificate',</p><p>"scan\_qrcode": 'Scan QR Code',</p><p>"detecting\_qrcode": 'Detecting QR code',</p><p>"back": 'Back',</p><p>"certificate\_isverified": 'Certificate is verified',</p><p>"verify\_another\_Certificate": 'Verify another Certificate',</p><p>"cetificate\_not\_valid": 'This Certificate is not valid',</p><p>“scan\_qrcode\_again” : ‘Please scan QR code again’</p><p>}</p><p></p><p>});</p><p></p>|
| :- |



iii) If anyone wants to use their own he/she can implement their own UI and  he/she can use service methods of vc-verification library. 


***App.component.ts :***

Import service file in your component where you want to call vc-verification library service method call.


|<p></p><p>import { Component } from '@angular/core';</p><p>import { VerifyService } from 'verify-module'; </p><p></p><p>@Component({</p><p>selector: 'app-root',</p><p>templateUrl: './app.component.html',</p><p>styleUrls: ['./app.component.scss']</p><p>})</p><p>export class AppComponent {</p><p> </p><p>constructor(public verifyService: VerifyService) {</p><p></p><p>this.verifyService.scanSuccessHandler(event).then((res) => {</p><p>console.log(res);</p><p>})</p><p>}</p><p></p><p>}</p><p></p><p></p>|
| :- |



List of service methods



|**Method Name**|**Parameter**|**Description**|
| :- | :- | :- |
|enableScanner()|-|To Hide/show scanner screen|
|scanSuccessHandler($event: any)|$event|This method used to verify scan data|

For latest info refer this doc - https://github.com/Sunbird-RC/community/blob/main/vc-verification-module.md
