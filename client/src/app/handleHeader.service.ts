import {Injectable} from '@angular/core';

@Injectable()

export class HandleHeaderService{

    private state;

    constructor(){
        this.state = false;
    }

    setState(s){
        this.state = s;
    }

    getState(){
       return this.state;
    }
}
