import { Injectable } from '@angular/core';
import { ConfigService} from '../config/config.service';
import * as JSZip from 'jszip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  scannerEnabled: boolean = false;
  success: boolean = false;
  qrString;
  item;
  loader: boolean = false;
  notValid: boolean = false;
  name: any;
  items: any = [];
  document = [];

  excludedFields: any = ['osid', 'id', 'type', 'fileUrl', 'otp', 'transactionId'];
  configData: any;

  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
  }

  enableScanner() {
    this.success = false;
    this.scannerEnabled = !this.scannerEnabled;
  }


  public scanSuccessHandler($event: any) {
    this.configData = this.configService.getConfigUrl();

    return new Promise((resolve, reject) => {

      this.items = [];
      this.qrString = $event;
      const CERTIFICATE_FILE = "certificate.json";
      const zip = new JSZip();
      zip.loadAsync($event).then((contents) => {
        return contents.files[CERTIFICATE_FILE].async('text')
      }).then(contents => {
        this.loader = true;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=BEE076F2D0801811396549DCC158F429; OAuth_Token_Request_State=1ef52fae-6e1a-4395-af75-beb03e9f8bc3");
        var signedData = JSON.parse(contents)
        this.readData(signedData.credentialSubject);
        var context = {signedData}
      //  context['signedCredentials'] = signedData
        var raw = JSON.stringify(context);

        var requestOptions: any = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(this.configData.baseUrl + "/verify", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.verified) {
              this.loader = false;
              this.success = true;
              this.scannerEnabled = false;
            }
            else {
              this.loader = false;
              this.scannerEnabled = false;
              this.notValid = true;
              //this.enableScanner()
            }

            console.log('result --- ', result.results[0]);
            result.results[0]['signedCredentials'] = signedData.credentialSubject;
            resolve(result);


          })
          .catch(error => {
            console.log('error', error);
            reject(error);
          });
      }).catch(err => {
        console.log('err', err);
        reject(err);
      }
      );
    });
  }

  readData(res) {
    this.item = [];
    var _self = this;
    Object.keys(res).forEach(function (key) {
      var tempObject = {};

      if (!_self.excludedFields.includes(key)) {
        tempObject['title'] = (key).charAt(0).toUpperCase() + key.slice(1);;
        tempObject['value'] = res[key];
        console.log(tempObject);

        _self.items.push(tempObject);
      }

    });
  }




}

