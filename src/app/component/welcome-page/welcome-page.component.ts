import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  restaurantList;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    /*this.restaurantService.getRestaurantList().subscribe(rep => {
      this.restaurantList = rep;

    });
    console.log(this.restaurantList);*/
  }




  getRestaurantList() {
    this.restaurantService.getRestaurantList().subscribe(
      (response) => {
        console.log('resp :' + response);
        this.restaurantList = response;
      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('end');
      }
    );
  }

}
