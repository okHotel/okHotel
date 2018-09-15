import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../../service/customer/customer.service';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {AuthService} from '../../service/auth/auth.service';
import {MessageService} from '../../service/message/message.service';
import {ThemingService} from '../../service/theming/theming.service';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    @ViewChild('needInput') needInput: ElementRef;
    customer = new Customer() ;
    submitted = false;
    message: string;
    customerNeeds: string[] = [];
    need: string = '';
    error: string;
    canUserEdit: boolean = false;

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private location: Location,
        private errorService: MessageService,
        public themingService: ThemingService
    ) {

      if (this.themingService.isUseBackgroundOn()) {
        document.body.style.backgroundImage = "url('../../assets/images/customer.jpg')";
        document.body.style.backgroundRepeat = "repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
      }

    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.customerService.getCustomer(id)
            .subscribe(customer => {
                    this.customer = customer;
                    this.customerNeeds = customer.otherNeeds;
                }, err => {
                    console.log(err)
                    this.errorService.error = err.error.message;
                });
        this.canUserEdit = AuthService.isUserAdmin();

        this.themingService.checkAndChangeInputBorders();
        this.themingService.checkAndChangeTextContrast();
    }

    update(): void {
//        this.submitted = true;
        this.customer.otherNeeds = this.customerNeeds;
        this.customerService.updateCustomer(this.customer)
            .subscribe();
    }

    updateAndGoBack() {
      this.update();
      this.location.back();
    }

    addNeedAndUpdate() {
        if (this.need.length > 0) {
            this.customerNeeds.push(this.need);
            this.need = '';
            this.update();
        }
      this.needInput.nativeElement.value = '';
    }

    deleteNeedAndUpdate(need: string) {
      this.customerNeeds = this.customerNeeds.filter( x => x !== need);
      this.customer.otherNeeds = this.customer.otherNeeds.filter(x => x !== need);
      this.update();
    }

    delete(): void {
        this.submitted = true;
        this.customerService.deleteCustomer(this.customer._id)
            .subscribe(result => this.message = "Customer Deleted Successfully!");
    }

    goBack(): void {
        this.location.back();
    }

    isInputInvalid(need) {
      return need === '';
    }

}
