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
    this.notValid  = false;
    this.scannerEnabled = !this.scannerEnabled;
  }


  public scanSuccessHandler($event: any, config = {}) {
    this.configData = this.configService.getConfigUrl();
    $event = (typeof($event) == 'string') ? $event : $event[0];

    if($event.hasOwnProperty('typeName') && $event.typeName == 'ZBAR_QRCODE'){
      $event = $event.value
    }

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
        this.readData(signedData.credentialSubject, config);
        var context = {}
        context['signedCredentials'] = signedData
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
            this.loader = false;
            this.scannerEnabled = false;
            this.notValid = true;
            console.log('error', error);
            reject(error);
          });
      }).catch(err => {
        this.loader = false;
        this.scannerEnabled = false;
        this.notValid = true;
        console.log('err', err);
        reject(err);
      }
      );
    });
  }

  readData(res, config) {
    this.items = [];
    var _self = this;

    if(config && config.hasOwnProperty('showResult')){
      for(let i = 0 ; i < config.showResult.length; i++){
      var tempObject = {};
      tempObject['title'] = config.showResult[i].title;
      tempObject['value'] = this.getValue(res, config.showResult[i].path);
      console.log(tempObject);

      this.items.push(tempObject);
      }

    }else{
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

  getValue(item, fieldsPath) {
    var propertySplit = fieldsPath.split(".");

    let fieldValue = [];

    for (let j = 0; j < propertySplit.length; j++) {
      let a = propertySplit[j];

      if (j == 0 && item.hasOwnProperty(a)) {
        fieldValue = item[a];
      } else if (fieldValue.hasOwnProperty(a)) {

        fieldValue = fieldValue[a];

      } else if (fieldValue[0]) {
        let arryItem = []
        if (fieldValue.length > 0) {
          for (let i = 0; i < fieldValue.length; i++) {
          }

          fieldValue = arryItem;

        } else {
          fieldValue = fieldValue[a];
        }

      } else {
        fieldValue = [];
      }
    }

    return fieldValue;
  

}


}

