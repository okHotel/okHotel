import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MenuVariationsComponent } from './menu-variations/menu-variations.component';
import { HomeComponent } from './home/home.component';
import { FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AdminStatisticsComponent } from './admin/admin-statistics/admin-statistics.component';
import {RoomNumberComponent} from './admin/room-number/room-number.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import { MakeMenuViewComponent } from './admin/make-menu-view/make-menu-view.component';
import { AddDishesComponent } from './admin/add-dishes/add-dishes.component';
import { AddVariationComponent } from './admin/add-variation/add-variation.component';
import { PantryComponent } from './admin/pantry/pantry.component';
import {CustomerService} from "./service/customer/customer.service";
import {HttpClientModule} from "@angular/common/http";
import { CustomerComponent } from './customer/customer.component';
import { RegistrationComponent } from './registration/registration.component';
import {CustomerDetailComponent} from "./customer-detail/customer-detail.component";
import {BookingService} from "./service/booking/booking.service";
import {AuthService} from "./service/auth/auth.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthService]},
    { path: 'login', component: LoginComponent},
    { path: 'restaurant', component: MenuComponent, canActivate: [AuthService]},
    { path: 'menu-variations', component: MenuVariationsComponent, canActivate: [AuthService]},
    { path: 'menu', component: MenuComponent, canActivate: [AuthService]},
    { path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthService]},
    { path: 'make-menu', component: MakeMenuViewComponent, canActivate: [AuthService]},
    { path: 'make-variation', component: AddVariationComponent, canActivate: [AuthService]},
    { path: 'pantry', component: PantryComponent, canActivate: [AuthService]},
    { path: 'statistics', component: AdminStatisticsComponent, canActivate: [AuthService]},
    { path: 'customers', component: CustomerComponent, canActivate: [AuthService] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'customers/:id', component: CustomerDetailComponent, canActivate: [AuthService] },
    { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    MenuComponent,
    MenuVariationsComponent,
    HomeComponent,
    CustomerDetailComponent,
    CustomerComponent,
    RegistrationComponent,
    ProfileComponent,
    RoomNumberComponent,
      AdminProfileComponent,
      MakeMenuViewComponent,
      AddDishesComponent,
      AddVariationComponent,
      PantryComponent,
      AdminStatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerService, BookingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
