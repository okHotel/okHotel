import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private errorMessage: string;
  private successMessage: string;

  constructor() { }

  get error(): string {
    return this.errorMessage;
  }

  set error(message: string) {
    this.errorMessage = message;
  }

  get success() {
    return this.successMessage;
  }

  set success(message: string) {
    this.successMessage = message;
  }
}
