import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VerifyModule} from '../../projects/verify-module/src/lib/verify-module.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VerifyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
