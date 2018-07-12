import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { MenuVariationsComponent } from './menu-variations/menu-variations.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', component:   LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'menu', component: MenuComponent}
    //{ path: 'home', component: HomeComponent}
    /*{ path: 'directive', component: DirectiveComponent },
    { path: 'service', component: ServiceComponent }*/
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    RegistrationComponent,
    MenuComponent,
    MenuVariationsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
