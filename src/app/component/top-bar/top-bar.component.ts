import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import * as moment from 'moment';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private restaurantService : RestaurantService) { }

  restaurantList: Restaurant[] = new Array();
  todayDate = moment().format('YYYY-MM-DD');

  ngOnInit() {
  }


  getRestaurantList() {
    this.restaurantService.getRestaurantList().subscribe(
      (response) => {
        this.restaurantList = response;}
      );
  }

}
