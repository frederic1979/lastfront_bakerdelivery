import { Component, OnInit } from '@angular/core';
import {Command} from '../../model/command';
import {RestaurantService} from '../../service/restaurant.service';
import {CommandService} from '../../service/command.service';
import {WeekDay} from '@angular/common';
import {Restaurant} from '../../model/restaurant';

@Component({
  selector: 'app-delivery-onboard',
  templateUrl: './delivery-onboard.component.html',
  styleUrls: ['./delivery-onboard.component.css']
})
export class DeliveryOnboardComponent implements OnInit {


  commandsList;
  restaurantListNotOk;
  restaurantListOk: Restaurant[] = new Array();
  commanda: Command;
  dateOftheDay = new Date();
  dateFormat;

  constructor(private restaurantService: RestaurantService, private commandService: CommandService) {
  }

  ngOnInit() {
    this.commandService.getCommands().subscribe(rep => {
      this.commandsList = rep;

    });

    this.restaurantService.getRestaurantList().subscribe(rep => {
      this.restaurantListNotOk = rep;

    });

  }

  setDayOfTheWeek(date) {

    switch (date.getDay()) {
      case 0 :
        return 'Dimanche';
        break;
      case 1 :
        return 'Lundi';
        break;
      case 2 :
        return 'Mardi';
        break;
      case 3 :
        return 'Mercredi';
        break;
      case 4 :
        return 'Jeudi';
        break;
      case 5 :
        return 'Vendredi';
        break;
      case 6 :
        return 'Samedi';
        break;

    }
  }


  getQuantityCommandByRestauIdAndDate(restaurantId, date) {
    this.dateFormat = date.toISOString().slice(0, 10);
    for (const command of this.commandsList) {
      console.log('egalité ?  : ' + command.date === this.dateFormat);
      if (command.restaurantId === restaurantId && command.date === this.dateFormat) {
        return command.quantity;
      }
    }
  }


  /*
    goDownRestaurantInList(restaurantId){
  this.restaurantListOk.add(restaurantI)
    }
  */

  addRestaurantInrestaurantListOk(restaurant) {
    console.log('ici le restau est : ' + restaurant.name);
    console.log('dans ma console' + this.restaurantListOk.push(restaurant));
    this.restaurantListNotOk.splice(this.restaurantListNotOk.indexOf(restaurant), 1);
  }

  cancelAddRestaurantInrestaurantListOk(restaurant){
  console.log('ici le restau est : ' + restaurant.name);
  console.log('dans ma console' + this.restaurantListNotOk.push(restaurant));
  this.restaurantListNotOk.splice(this.restaurantListOk.indexOf(restaurant), 1);
}

}
