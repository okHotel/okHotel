import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-number',
  templateUrl: './room-number.component.html',
  styleUrls: ['./room-number.component.css']
})
export class RoomNumberComponent implements OnInit {

  room_numbers = [101,102,103];

  constructor() { }

  ngOnInit() {
  }

}

