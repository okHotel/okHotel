import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MenuVariationsComponent } from './menu-variations/menu-variations.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AdminStatisticsComponent } from './admin/admin-statistics/admin-statistics.component';
import { MakeMenuViewComponent } from './admin/make-menu-view/make-menu-view.component';
import { AddDishesComponent } from './admin/add-dishes/add-dishes.component';
import { AddVariationComponent } from './admin/add-variation/add-variation.component';
import {CustomerService} from './service/customer/customer.service';
import {HttpClientModule} from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { RegistrationComponent } from './registration/registration.component';

import {CustomerDetailComponent} from './customer/customer-detail/customer-detail.component';
import {BookingService} from './service/booking/booking.service';
import {AuthService} from './service/auth/auth.service';
import { DatePipe } from '@angular/common';
import {BarcodeDecoderService} from './service/pantry/barcode-scanner/barcode-decoder.service';
import {
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCheckboxModule, MatListModule
} from '@angular/material';
import {BarcodeValidatorService} from './service/pantry/barcode-scanner/barcode-validator.service';
import {AddProductComponent} from './admin/pantry/add-product/add-product.component';
import {PantryService} from './service/pantry/pantry.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { EditProductComponent } from './admin/pantry/edit-product/edit-product.component';
import { DeleteProductComponent } from './admin/pantry/delete-product/delete-product.component';
import { ProductsComponent } from './admin/pantry/products.component';
import { DeleteCustomerComponent } from './customer/delete-customer/delete-customer.component';
import { MessageComponent } from './message/message.component';
import {MessageService} from './service/message/message.service';
import { AccessibilitySettingComponent } from './accessibility-setting/accessibility-setting.component';
import { ColorPickerModule } from 'ngx-color-picker';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthService]},
    { path: 'login', component: LoginComponent},
    { path: 'restaurant', component: MenuComponent, canActivate: [AuthService]},
    { path: 'make-menu', component: MakeMenuViewComponent, canActivate: [AuthService]},
    { path: 'make-variation', component: AddVariationComponent, canActivate: [AuthService]},
    { path: 'pantry', component: ProductsComponent, canActivate: [AuthService]},
    { path: 'pantry/add-product', component: AddProductComponent, canActivate: [AuthService]},
    { path: 'pantry/add-product/:code', component: AddProductComponent, canActivate: [AuthService]},
    { path: 'pantry/edit-product/:id', component: EditProductComponent, canActivate: [AuthService]},
    { path: 'admin/restaurant', component: AdminStatisticsComponent, canActivate: [AuthService]},
    { path: 'customers', component: CustomerComponent, canActivate: [AuthService] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'customers/:id', component: CustomerDetailComponent, canActivate: [AuthService] },
    { path: 'profile', component: ProfileComponent },
    { path: 'accessibility', component: AccessibilitySettingComponent}
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
        MakeMenuViewComponent,
        ProductsComponent,
        AddProductComponent,
        EditProductComponent,
        DeleteProductComponent,
        AddDishesComponent,
        AddVariationComponent,
        AdminStatisticsComponent,
        EditProductComponent,
        DeleteProductComponent,
        ProductsComponent,
        DeleteCustomerComponent,
        MessageComponent,
        AccessibilitySettingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatListModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        MDBBootstrapModule.forRoot(),
        ColorPickerModule
    ],

    entryComponents: [
        AddProductComponent,
        EditProductComponent,
        DeleteProductComponent,
        DeleteCustomerComponent,
        ProductsComponent
    ],
    exports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule, MatPaginatorModule, BrowserAnimationsModule,
        NoopAnimationsModule, MatSortModule],
    providers: [CustomerService, BookingService, AuthService, BarcodeDecoderService, MessageService,
        BarcodeValidatorService, PantryService, DatePipe],
    bootstrap: [AppComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
