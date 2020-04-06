import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../model/restaurant';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';
import {Local} from 'protractor/built/driverProviders';


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurantId;
  restaurant: Restaurant = new Restaurant();
  commands ;
  commandsWeek;
  date = null;
  start = '2020-01-01';
  end = '2020-01-07';
  newCommand: Command = new Command();
  a: number;
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

    this.commandService.getCommandsByRestaurantIdAndBetweenTwoDates(this.restaurantId, this.date, this.start, this.end).subscribe(rep => {
      this.commandsWeek = rep;
      console.log(this.commandsWeek.length);
    });


  }

  addQuantity(quantity) {
    quantity = quantity + 1;
    this.ngOnInit();
    console.log(quantity);
  }

  subQuantity(quantity) {
    quantity = quantity - 1;
  }

  updateCommand(command, a) {
    console.log('entrer dans le update');
    this.newCommand.id = command.id
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + a;
    this.newCommand.restaurantId = this.restaurantId;

    console.log('la quantité est maintenant :' + this.newCommand.quantity);
    this.commandService.updateCommand(this.newCommand).subscribe(
      (response) => {
        console.log('resp :' + response);
        this.ngOnInit();

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('end');
      }
    );

  }


}


