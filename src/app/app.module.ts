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

@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ExampleComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [NavComponent, HeaderComponent, FooterComponent],
})
export class AppModule {}
