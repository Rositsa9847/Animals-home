import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProcessRequestsComponent } from './process-requests/process-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './services/registration/registration.service';
import { RegistrationShelterComponent } from './registration-shelter/registration-shelter.component';
import { LoginShelterComponent } from './login-shelter/login-shelter.component';
import { AgmCoreModule } from '@agm/core';
import { RequestService } from './services/request/request.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProcessRequestsComponent,
    AdminPanelComponent,
    MainPanelComponent,
    RegistrationComponent,
    RegistrationShelterComponent,
    LoginShelterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCifSZ4mMeZTYbNXAoIB802ot5UT_9IJSI',
      libraries: ['places']
    })
  ],
  providers: [AuthenticationService, RegistrationService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
