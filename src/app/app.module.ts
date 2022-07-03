import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
=======
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> c9aa6773565a0acefaa36fcdc5fb09745181c8f8

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule,
    NgbModule
=======
    RouterModule,
    HttpClientModule
>>>>>>> c9aa6773565a0acefaa36fcdc5fb09745181c8f8
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
