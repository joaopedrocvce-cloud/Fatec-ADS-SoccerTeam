import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TeamComponent } from './team-component/team-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home-component/home-component';
import { FooterComponent } from './footer-component/footer-component';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [App, TeamComponent, HomeComponent, FooterComponent, NavBarComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
