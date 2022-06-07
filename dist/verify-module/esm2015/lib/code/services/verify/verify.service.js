import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import * as i0 from "@angular/core";
import * as i1 from "../config/config.service";
export class VerifyService {
    constructor(configService) {
        this.configService = configService;
        this.scannerEnabled = false;
        this.success = false;
        this.loader = false;
        this.notValid = false;
        this.items = [];
        this.document = [];
        this.excludedFields = ['osid', 'id', 'type', 'fileUrl', 'otp', 'transactionId'];
    }
    ngOnInit() {
    }
    enableScanner() {
        this.success = false;
        this.scannerEnabled = !this.scannerEnabled;
    }
    scanSuccessHandler($event) {
        this.configData = this.configService.getConfigUrl();
        return new Promise((resolve, reject) => {
            this.items = [];
            this.qrString = $event;
            const CERTIFICATE_FILE = "certificate.json";
            const zip = new JSZip();
            zip.loadAsync($event).then((contents) => {
                return contents.files[CERTIFICATE_FILE].async('text');
            }).then(contents => {
                this.loader = true;
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Cookie", "JSESSIONID=BEE076F2D0801811396549DCC158F429; OAuth_Token_Request_State=1ef52fae-6e1a-4395-af75-beb03e9f8bc3");
                var signedData = JSON.parse(contents);
                this.readData(signedData.credentialSubject);
                var context = { signedData };
                //  context['signedCredentials'] = signedData
                var raw = JSON.stringify(context);
                var requestOptions = {
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
            });
        });
    }
    readData(res) {
        this.item = [];
        var _self = this;
        Object.keys(res).forEach(function (key) {
            var tempObject = {};
            if (!_self.excludedFields.includes(key)) {
                tempObject['title'] = (key).charAt(0).toUpperCase() + key.slice(1);
                ;
                tempObject['value'] = res[key];
                console.log(tempObject);
                _self.items.push(tempObject);
            }
        });
    }
}
VerifyService.ɵfac = function VerifyService_Factory(t) { return new (t || VerifyService)(i0.ɵɵinject(i1.ConfigService)); };
VerifyService.ɵprov = i0.ɵɵdefineInjectable({ token: VerifyService, factory: VerifyService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VerifyService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.ConfigService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGVsbC9Eb2N1bWVudHMvU0RrL1ZDLVZlcmlmeS1MaWJyYXJ5L1ZjLVZlcmlmeS9wcm9qZWN0cy92ZXJpZnktbW9kdWxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb2RlL3NlcnZpY2VzL3ZlcmlmeS92ZXJpZnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDOzs7QUFNL0IsTUFBTSxPQUFPLGFBQWE7SUFleEIsWUFBbUIsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFiL0MsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUd6QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQsbUJBQWMsR0FBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFHN0IsQ0FBQztJQUVwRCxRQUFRO0lBQ1IsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxDQUFDO0lBR00sa0JBQWtCLENBQUMsTUFBVztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUVyQyxJQUFJLENBQUMsS0FB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QyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHO1lBQ3BDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFBLENBQUM7Z0JBQ3BFLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXhCLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlCO1FBRUgsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzswRUF2R1UsYUFBYTtxREFBYixhQUFhLFdBQWIsYUFBYSxtQkFGWixNQUFNO2tEQUVQLGFBQWE7Y0FIekIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZX0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIEpTWmlwIGZyb20gJ2pzemlwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVmVyaWZ5U2VydmljZSB7XG5cbiAgc2Nhbm5lckVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xuICBxclN0cmluZztcbiAgaXRlbTtcbiAgbG9hZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIG5vdFZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gIG5hbWU6IGFueTtcbiAgaXRlbXM6IGFueSA9IFtdO1xuICBkb2N1bWVudCA9IFtdO1xuXG4gIGV4Y2x1ZGVkRmllbGRzOiBhbnkgPSBbJ29zaWQnLCAnaWQnLCAndHlwZScsICdmaWxlVXJsJywgJ290cCcsICd0cmFuc2FjdGlvbklkJ107XG4gIGNvbmZpZ0RhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBlbmFibGVTY2FubmVyKCkge1xuICAgIHRoaXMuc3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuc2Nhbm5lckVuYWJsZWQgPSAhdGhpcy5zY2FubmVyRW5hYmxlZDtcbiAgfVxuXG5cbiAgcHVibGljIHNjYW5TdWNjZXNzSGFuZGxlcigkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuY29uZmlnRGF0YSA9IHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWdVcmwoKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgIHRoaXMucXJTdHJpbmcgPSAkZXZlbnQ7XG4gICAgICBjb25zdCBDRVJUSUZJQ0FURV9GSUxFID0gXCJjZXJ0aWZpY2F0ZS5qc29uXCI7XG4gICAgICBjb25zdCB6aXAgPSBuZXcgSlNaaXAoKTtcbiAgICAgIHppcC5sb2FkQXN5bmMoJGV2ZW50KS50aGVuKChjb250ZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gY29udGVudHMuZmlsZXNbQ0VSVElGSUNBVEVfRklMRV0uYXN5bmMoJ3RleHQnKVxuICAgICAgfSkudGhlbihjb250ZW50cyA9PiB7XG4gICAgICAgIHRoaXMubG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIG15SGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICBteUhlYWRlcnMuYXBwZW5kKFwiQ29va2llXCIsIFwiSlNFU1NJT05JRD1CRUUwNzZGMkQwODAxODExMzk2NTQ5RENDMTU4RjQyOTsgT0F1dGhfVG9rZW5fUmVxdWVzdF9TdGF0ZT0xZWY1MmZhZS02ZTFhLTQzOTUtYWY3NS1iZWIwM2U5ZjhiYzNcIik7XG4gICAgICAgIHZhciBzaWduZWREYXRhID0gSlNPTi5wYXJzZShjb250ZW50cylcbiAgICAgICAgdGhpcy5yZWFkRGF0YShzaWduZWREYXRhLmNyZWRlbnRpYWxTdWJqZWN0KTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7c2lnbmVkRGF0YX1cbiAgICAgIC8vICBjb250ZXh0WydzaWduZWRDcmVkZW50aWFscyddID0gc2lnbmVkRGF0YVxuICAgICAgICB2YXIgcmF3ID0gSlNPTi5zdHJpbmdpZnkoY29udGV4dCk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zOiBhbnkgPSB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczogbXlIZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IHJhdyxcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdydcbiAgICAgICAgfTtcblxuICAgICAgICBmZXRjaCh0aGlzLmNvbmZpZ0RhdGEuYmFzZVVybCArIFwiL3ZlcmlmeVwiLCByZXF1ZXN0T3B0aW9ucylcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQudmVyaWZpZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zY2FubmVyRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuc2Nhbm5lckVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5ub3RWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgIC8vdGhpcy5lbmFibGVTY2FubmVyKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCAtLS0gJywgcmVzdWx0LnJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgcmVzdWx0LnJlc3VsdHNbMF1bJ3NpZ25lZENyZWRlbnRpYWxzJ10gPSBzaWduZWREYXRhLmNyZWRlbnRpYWxTdWJqZWN0O1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuXG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2VycicsIGVycik7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWREYXRhKHJlcykge1xuICAgIHRoaXMuaXRlbSA9IFtdO1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmtleXMocmVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB0ZW1wT2JqZWN0ID0ge307XG5cbiAgICAgIGlmICghX3NlbGYuZXhjbHVkZWRGaWVsZHMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICB0ZW1wT2JqZWN0Wyd0aXRsZSddID0gKGtleSkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7O1xuICAgICAgICB0ZW1wT2JqZWN0Wyd2YWx1ZSddID0gcmVzW2tleV07XG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXBPYmplY3QpO1xuXG4gICAgICAgIF9zZWxmLml0ZW1zLnB1c2godGVtcE9iamVjdCk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG5cblxuXG59XG5cbiJdfQ==