import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private message: string;

  constructor() { }

  get error(): string {
    return this.message;
  }

  set error(message: string) {
    this.message = message;
  }
}
