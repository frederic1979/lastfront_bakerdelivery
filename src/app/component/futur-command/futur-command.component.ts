import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommandService} from '../../service/command.service';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import {Command} from '../../model/command';
import * as moment from 'moment';

@Component({
  selector: 'app-futur-command',
  templateUrl: './futur-command.component.html',
  styleUrls: ['./futur-command.component.css']
})
export class FuturCommandComponent implements OnInit {

  day;
  date;
  commandId;
  restaurantId;
  restaurant = new Restaurant();
  commandList: Command[] = new Array();
  command: Command = new Command();
  newCommand: Command = new Command();


  startDate = moment().add(2, 'days').format('YYYY-MM-DD');
  endDate = moment().add(15, 'days').format('YYYY-MM-DD');

  constructor(private commandService: CommandService, private restaurantService: RestaurantService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    /*On top le commandId de URL*/
    this.commandId = this.route.snapshot.paramMap.get('commandId');

    /*On top la date de URL*/
    this.date = this.route.snapshot.paramMap.get('date');

    /*On top le restaurantId de URL*/
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');


    /*On charge notre restaurant qui a restaurantId*/
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
      this.restaurant = rep;
    });

    /*On charge notre command qui a commandId*/
    this.commandService.getCommandByCommandId(this.commandId).subscribe(rep => {
      this.command = rep;
    });
  }

  dayDate(date) {
    return moment(date).locale('fr').format('dddd');
  }

  displayFrenchDate(date) {
    return moment(date).locale('fr').format('L');
  }

  /*  addOneDay(date) {
      return moment(date).add(1, 'days').format('YYYY-MM-DD');
    }*/

  /*  passDay(x, y) {
      x = x + 1; console.log(x);
      y = y + 1; console.log(y);

    }*/

/*
  commandByDate(date) {
    this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, date).subscribe(
      (response) => {
        console.log('resp :' + response);
        this.command = response;
        return this.command;

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('end');
      }
    );

  }

  dateTomorrow(date) {
    return moment(date).add(1, 'days').format('YYYY-MM-DD');
  }
*/


  updateCommand(command: Command, addQuantity) {

    this.newCommand.id = command.id;
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + addQuantity;
    this.newCommand.restaurantId = this.restaurantId;


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
