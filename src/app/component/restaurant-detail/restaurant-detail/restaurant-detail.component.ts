import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../../service/restaurant.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  restaurantId;
  restaurant;


  ngOnInit() {

 /*   this.route.paramMap.subscribe(params => {
      this.restaurantId = params.get('restaurantId');
      this.restaurant = this.restaurantService.getRestaurantById(this.restaurantId);
    });
*/

    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
      this.restaurant = rep;
    });


  }

}


