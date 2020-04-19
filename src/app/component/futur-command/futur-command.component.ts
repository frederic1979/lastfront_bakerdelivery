import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommandService} from '../../service/command.service';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import {Command} from '../../model/command';
import * as moment from 'moment';
import {Matrix} from '../../model/matrix';
import {MatrixService} from '../../service/matrix.service';

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

  newMatrix: Matrix = new Matrix();

  startDate = moment().add(2, 'days').format('YYYY-MM-DD');
  endDate = moment().add(15, 'days').format('YYYY-MM-DD');

  constructor(private commandService: CommandService, private restaurantService: RestaurantService, private matrixService: MatrixService, private route: ActivatedRoute) {
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


  updateCommand(command: Command, addQuantity) {

    this.newCommand.id = command.id;
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + addQuantity;
    this.newCommand.restaurantId = this.restaurantId;

    this.newMatrix.restaurantId =  this.restaurantId;
    this.newMatrix.startDate = '';
    this.newMatrix.endDate = '';
    this.newMatrix.mondayQuantity = 0;
    this.newMatrix.tuesdayQuantity = 0;
    this.newMatrix.wednesdayQuantity = 0;
    this.newMatrix.thursdayQuantity = 0;
    this.newMatrix.fridayQuantity = 0;
    this.newMatrix.saturdayQuantity = 0;
    this.newMatrix.sundayQuantity = 0;

    this.commandService.updateCommand(this.newCommand).subscribe(
      (response) => {


        this.matrixService.createMatrix(this.newMatrix).subscribe(rep => {
        });

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
