import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../model/restaurant';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurantId;
  restaurant: Restaurant = new Restaurant();
  commands ;

  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private route: ActivatedRoute) {
  }




  ngOnInit() {

 /*   this.route.paramMap.subscribe(params => {
      this.restaurantId = params.get('restaurantId');
      this.restaurant = this.restaurantService.getRestaurantById(this.restaurantId);
    });*/

    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
      this.restaurant = rep;
    });

    /*this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');*/
    this.commandService.getCommandsByRestaurantId(this.restaurantId).subscribe(rep => {
      this.commands = rep;
    });



  }




}


