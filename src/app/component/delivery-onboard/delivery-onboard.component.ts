import {Component, OnInit} from '@angular/core';
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


  restaurantList: Restaurant[] = new Array();
  restaurant: Restaurant = new Restaurant();
  dateOfTheDay = new Date();
  dateFormat;
  commandListOfTheDayAttente;
  commandListOfTheDayLivre;


  constructor(private restaurantService: RestaurantService, private commandService: CommandService) {
  }

  ngOnInit() {

    this.dateFormat = this.dateOfTheDay.toISOString().slice(0, 10);

    this.commandService.getCommandsByEtat('Attente', this.dateFormat).subscribe(rep => {
      this.commandListOfTheDayAttente = rep;

    });

    this.commandService.getCommandsByEtat('Livree', this.dateFormat).subscribe(rep => {
      this.commandListOfTheDayLivre = rep;

    });

    this.restaurantService.getRestaurantList().subscribe(rep => {
      this.restaurantList = rep;

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

  displayNameOfRestaurantId(restaurantId) {
    for (const restaurant of this.restaurantList) {
      if (restaurant.id === restaurantId) {
        return restaurant.name;
      }
    }
  }

  updateCommandDelivery(command) {

    command.etat = 'Livree';

    this.commandService.updateCommand(command).subscribe(
      (response) => {
        this.ngOnInit();
        console.log('resp :' + response);

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('finishing updating command');

      }
    );
  }

  cancelCommandDelivery(command) {
    command.etat = 'Attente';

    this.commandService.updateCommand(command).subscribe(
      (response) => {
        this.ngOnInit();
        console.log('resp :' + response);

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('finishing updating command');

      }
    );
  }


}
