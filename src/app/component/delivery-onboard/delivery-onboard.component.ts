import {Component, OnInit} from '@angular/core';
import {Command} from '../../model/command';
import {RestaurantService} from '../../service/restaurant.service';
import {CommandService} from '../../service/command.service';
import {WeekDay} from '@angular/common';
import {Restaurant} from '../../model/restaurant';
import {MatrixService} from '../../service/matrix.service';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

// @ts-ignore
// @ts-ignore
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

  dateUrl;
  commandsOfTheDay: Command[] = new Array();
  commandsOfTheDayAtt: Command[] = new Array();
  commandsOfTheDayLivree: Command[] = new Array();
command: Command;
  ncommand: Command;

  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService: MatrixService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      /*On top la date de URL*/
      this.dateUrl = params.get('date');
      /*this.ndateUrl = new Date(params.get('date'));
      this.dayNumber = this.ndateUrl.getDay();
      this.day = moment(this.dateUrl).locale('fr').format('dddd');*/


      /*on charge les commandes en attentes et livrées à la dateUrl, car dans cette méthode il y a le save des commandes qui n'ont pas été modifiées par le resto*/
      this.commandService.getCommandsByDate(this.dateUrl).subscribe(commandList => {
        console.log('etape1');
        this.commandsOfTheDay = commandList;

        /*On charge les commandes en attente dans la liste commandsOfTheDayAtt*/
        this.commandService.getCommandsByEtatAndDate('Attente', this.dateUrl).subscribe(commandListAtt => {
          console.log('etape2');
          this.commandsOfTheDayAtt = commandListAtt;
        });

        /*On charge les commandes en attente dans la liste commandsOfTheDayLivree*/
        this.commandService.getCommandsByEtatAndDate('Livree', this.dateUrl).subscribe(commandListLiv => {
          console.log('etape2bis');
          this.commandsOfTheDayLivree = commandListLiv;
        });


      });


        /*on charge la liste des restaurants*/
      this.restaurantService.getRestaurantList().subscribe(restaurantList => {

          this.restaurantList = restaurantList;
        });


      });
  }

  getCommandByRestaurantIdAndDate(restaurantId, date){
this.commandService.getCommandByRestaurantIdAndDate(restaurantId, date).subscribe(command => {
  this.command = command;
});

  }

  displayNameOfRestaurantId(restaurantId) {
    for (const restaurant of this.restaurantList) {
      if (restaurant.id === restaurantId) {
        return restaurant.name;
      }
    }
  }

  updateCommandDelivery(command: Command, commandId) {

    command.etat = 'Livree';
    this.commandService.updateCommand(command, commandId).subscribe(
      (response) => {
        this.ncommand = response;
        this.ngOnInit();
      }
    );

  }

  cancelCommandDelivery(command) {
    command.etat = 'Attente';

    this.commandService.updateCommand(command, command.id).subscribe(
      (response) => {
        this.command = command;

      }
    );
    this.ngOnInit();
  }



}



/*



*/


/*  setDayOfTheWeek(date) {

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
  }*/


