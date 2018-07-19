import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './customer/registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { MenuVariationsComponent } from './menu-variations/menu-variations.component';
import { HomeComponent } from './home/home.component';
import { CustomerDetailComponent} from './customer/customer-detail/customer-detail.component';
import { FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CustomerService } from './service/customer.service';
import { HttpModule } from '@angular/http';
import {RoomNumberComponent} from './admin/room-number/room-number.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import { MakeMenuViewComponent } from './admin/make-menu-view/make-menu-view.component';
import { AddDishesComponent } from './admin/add-dishes/add-dishes.component';
import { AddVariationComponent } from './admin/add-variation/add-variation.component';


const appRoutes: Routes = [

    { path: '', component:   LoginComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'home', component: HomeComponent},
    { path: 'profile/:bookingSurname', component: CustomerDetailComponent},
    { path: 'restaurant', component: MenuComponent},
    { path: 'menu-variations', component: MenuVariationsComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'admin-profile', component: AdminProfileComponent},
    { path: 'make-menu', component: MakeMenuViewComponent},
    { path: 'make-variation', component: AddVariationComponent}

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
    ProfileComponent,
    RoomNumberComponent,
      AdminProfileComponent,
      MakeMenuViewComponent,
      AddDishesComponent,
      AddVariationComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
