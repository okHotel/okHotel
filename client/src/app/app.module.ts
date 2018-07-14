import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './costumer/registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { MenuVariationsComponent } from './menu-variations/menu-variations.component';
import { HomeComponent } from './home/home.component';
import {CustomerDetailComponent} from './costumer/customer-detail/customer-detail.component';
import {FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [

    { path: '', component:   LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: CustomerDetailComponent},
    { path: 'restaurant', component: MenuComponent},
    { path: 'menu-variations', component: MenuVariationsComponent},
    { path: 'menu', component: MenuComponent}

    // { path: 'home', component: HomeComponent}
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
    HomeComponent,
    CustomerDetailComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
