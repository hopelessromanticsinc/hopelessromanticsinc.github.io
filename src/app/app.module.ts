import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExampleComponent } from './components/example/example.component';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectWalrusComponent } from './components/project-walrus/project-walrus.component';
import { CookienoticeComponent } from './components/cookienotice/cookienotice.component';
import { InfomodalComponent } from './components/infomodal/infomodal.component';

@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ExampleComponent,
    AboutComponent,
    ProjectWalrusComponent,
    CookienoticeComponent,
    InfomodalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [NavComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
