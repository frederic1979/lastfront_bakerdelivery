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
  mondayOfTheWeek;
  mondayOfTheWeek2;
  sundayOfTheWeek;
  sundayOfTheWeek2;
  numberOfActualWeek;
  date = new Date();

  ngOnInit() {


    this.numberOfActualWeek = moment().format('w');
    this.findMondayOfTheWeek(this.date); // On obtient le mondayOfTheWeek
    console.log(this.mondayOfTheWeek)
    this.findSundayOfTheWeek(this.mondayOfTheWeek); // On obtient le sundayOfTheWeek
    console.log(this.sundayOfTheWeek);
  }


  getRestaurantList() {
    this.restaurantService.getRestaurantList().subscribe(
      (response) => {
        this.restaurantList = response;
      }
    );
  }


  findMondayOfTheWeek(date) {
    switch (date.getDay()) {
      case 0:

        this.mondayOfTheWeek = moment(date).add(1, 'days').format('YYYY-MM-DD');
        break;

      case 1:

        this.mondayOfTheWeek = moment(date).format('YYYY-MM-DD');
        break;

      case 2:

        this.mondayOfTheWeek = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case 3:

        this.mondayOfTheWeek = moment(date).subtract(2, 'days').format('YYYY-MM-DD');
        break;
      case 4:

        this.mondayOfTheWeek = moment(date).subtract(3, 'days').format('YYYY-MM-DD');
        break;
      case 5:

        this.mondayOfTheWeek = moment(date).subtract(4, 'days').format('YYYY-MM-DD');
        break;
      case 6:

        this.mondayOfTheWeek = moment(date).subtract(5, 'days').format('YYYY-MM-DD');
        break;

      default:

    }
  }

  findSundayOfTheWeek(date) {
    this.sundayOfTheWeek = moment(this.mondayOfTheWeek).add(6, 'days').format('YYYY-MM-DD');
  }

}
