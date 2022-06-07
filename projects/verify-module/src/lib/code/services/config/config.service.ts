import { Injectable } from '@angular/core';
import { VerifyLibraryService } from '../../../verify-module.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(public verifyLibraryService: VerifyLibraryService) { }

  getConfigUrl() {
    return this.verifyLibraryService.configData;
  }

  
}
