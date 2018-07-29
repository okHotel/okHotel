import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
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
import { HttpModule } from '@angular/http';
import {RoomNumberComponent} from './admin/room-number/room-number.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import { MakeMenuViewComponent } from './admin/make-menu-view/make-menu-view.component';
import { AddDishesComponent } from './admin/add-dishes/add-dishes.component';
import { AddVariationComponent } from './admin/add-variation/add-variation.component';
import { PantryComponent } from './admin/pantry/pantry.component';
import {BookingService} from "./service/booking/booking.service";
import {CustomerService} from "./service/customer/customer.service";
import {HttpClientModule} from "@angular/common/http";
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import {CustomerDetailComponent} from "./customer-detail/customer-detail.component";

const appRoutes: Routes = [

    { path: '', component: HomeComponent},
    { path: 'login', component:   LoginComponent},
    { path: 'restaurant', component: MenuComponent},
    { path: 'menu-variations', component: MenuVariationsComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'admin-profile', component: AdminProfileComponent},
    { path: 'make-menu', component: MakeMenuViewComponent},
    { path: 'make-variation', component: AddVariationComponent},
    { path: 'pantry', component: PantryComponent},
    { path: 'statistics', component: AdminStatisticsComponent},
    { path: 'customers', component: CustomerComponent },
    { path: 'customer/add', component: AddCustomerComponent },
    { path: 'customers/:id', component: CustomerDetailComponent },
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
    AddCustomerComponent,
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
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
