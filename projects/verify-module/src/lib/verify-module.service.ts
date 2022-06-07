import { Injectable, Optional, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyLibraryService {
  configData: any;
  constructor( @Optional() @Inject("vcConfig") public config: any) {
    this.configData = config;
  }
}

