import { Component, OnInit } from '@angular/core';
import {Command} from '../../model/command';
import {RestaurantService} from '../../service/restaurant.service';
import {CommandService} from '../../service/command.service';
import {WeekDay} from '@angular/common';

@Component({
  selector: 'app-delivery-onboard',
  templateUrl: './delivery-onboard.component.html',
  styleUrls: ['./delivery-onboard.component.css']
})
export class DeliveryOnboardComponent implements OnInit {


  commandsList;
  restaurantList;
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
      this.restaurantList = rep;

    });
    console.log('la date du jour en js' + this.dateOftheDay);
    console.log('le jour en js est :' + this.dateOftheDay.getDay());

    console.log(this.dateOftheDay.toISOString().slice(0, 10));

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
    console.log('la date est comme ça : ' + date);
    this.dateFormat = date.toISOString().slice(0, 10);
    console.log(this.dateFormat);
    for (const command of this.commandsList) {
      console.log('egalité ?  : ' + command.date === this.dateFormat);
      if (command.restaurantId === restaurantId && command.date === this.dateFormat) {
        return  command.quantity;
      }
    }
  }






}
