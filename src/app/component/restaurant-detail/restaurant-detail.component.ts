import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../model/restaurant';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';
import * as moment from 'moment';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurantId;
  restaurant: Restaurant = new Restaurant();
  newCommand: Command = new Command();
  commandsWeek;
  date = new Date();
  start = '2020-03-30';
  end = '2020-04-09';


   myMoment: moment.Moment = moment(this.start);

  addOrSubQuantity: number;

  x: Date;


  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    console.log('this.myMoment vau : :' + this.myMoment);
    console.log('("MMM Do YY"); vaut : ' + this.myMoment.format('MMM Do YY'));
    console.log('moment(this.start).format(\'MMM Do YY\')); vaut : ' + moment(this.start).locale('fr').format('MMM Do YY'));
    console.log('jour de ma date : '+ moment(this.start).format('dddd'));
    console.log(moment(this.start).locale('fr'));
    console.log('jour de ma date en french : '+ moment(this.start).locale('fr').format('dddd'));

    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
          this.restaurant = rep;
    });


    this.commandService.getCommandsByRestaurantIdAndBetweenTwoDates(this.restaurantId, this.date, this.start, this.end).subscribe(rep => {
      this.commandsWeek = rep;

    });

    this.x = new Date();
    console.log(this.x);

  }

  displayDay(date) {
    return moment(date).locale('fr').format('dddd');
  }

  setTomorrowDay(date) {

    switch (date.getDay()) {
      case 0 :
        return 'Lundi';
        break;
      case 1 :
        return 'Mardi';
        break;
      case 2 :
        return 'Mercredi';
        break;
      case 3 :
        return 'Jeudi';
        break;
      case 4 :
        return 'Vendredi';
        break;
      case 5 :
        return 'Samedi';
        break;
      case 6 :
        return 'Dimanche';
        break;

    }
  }


  updateCommand(command: Command, addQuantity) {

    this.newCommand.id = command.id;
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + addQuantity;
    this.newCommand.restaurantId = this.restaurantId;
  /*  command.quantity = command.quantity + addQuantity;*/

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


