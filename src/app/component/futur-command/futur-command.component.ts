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
  todayDate = moment().format('YYYY-MM-DD');
  commandId;
  restaurantId;
  restaurant = new Restaurant();
  commandList: Command[] = new Array();
  command: Command = new Command();
  newCommand: Command = new Command();

  lastMatrix: Matrix = new Matrix();
  newMatrix: Matrix = new Matrix();
  matrixTab: Matrix[] = new Array();

  startDate = moment().add(2, 'days').format('YYYY-MM-DD');
  endDate = moment().add(15, 'days').format('YYYY-MM-DD');
  ndate;
  constructor(private commandService: CommandService, private restaurantService: RestaurantService, private matrixService: MatrixService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    /*On top le commandId de URL*/
    this.commandId = this.route.snapshot.paramMap.get('commandId');

    /*On top la date de URL*/
    this.date = this.route.snapshot.paramMap.get('date');
    this.ndate = new Date(this.date);

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


    this.matrixService.getMatrixByRestaurantIdAndEndDateNullAndStartDateBetweenBeginAndFinish(this.restaurantId, '2020-01-01', this.date).subscribe(rep => {

      if (this.matrixTab.length !== 0) {
        console.log('on est dans le 2nd tour ?');
        this.matrixTab.splice(0);
        this.lastMatrix = rep;
        /*on affecte id de last à la new*/
        this.newMatrix.id = this.lastMatrix.id;

      } else {
        console.log('on est dans le 1er tour ?');
        this.lastMatrix = rep;
        this.getDayQuantity();
      }
    });





  }

  dayDate(date) {
    return moment(date).locale('fr').format('dddd');
  }

  displayFrenchDate(date) {
    return moment(date).locale('fr').format('L');
  }



  getDayQuantity(): number {
    switch (this.ndate.getDay()) {
      case 0:

        return this.lastMatrix.mondayQuantity;
        break;
      case 1:

        return this.lastMatrix.tuesdayQuantity;
        break;

      case 2:

        return this.lastMatrix.wednesdayQuantity;
        break;
      case 3:

        return this.lastMatrix.thursdayQuantity;
        break;
      case 4:

        return this.lastMatrix.fridayQuantity;
        break;
      case 5:

        return this.lastMatrix.saturdayQuantity;
        break;
      case 6:

        return this.lastMatrix.sundayQuantity;

        break;

    }
  }



  updateMatrix(addOrSubQuantity) {

    this.newMatrix.restaurantId = this.restaurantId;
    this.newMatrix.startDate = this.todayDate;
    this.newMatrix.endDate = '';

    this.newMatrix.mondayQuantity = this.lastMatrix.mondayQuantity;
    this.newMatrix.tuesdayQuantity = this.lastMatrix.tuesdayQuantity;
    this.newMatrix.wednesdayQuantity = this.lastMatrix.wednesdayQuantity;
    this.newMatrix.thursdayQuantity = this.lastMatrix.thursdayQuantity;
    this.newMatrix.fridayQuantity = this.lastMatrix.fridayQuantity;
    this.newMatrix.saturdayQuantity = this.lastMatrix.saturdayQuantity;
    this.newMatrix.sundayQuantity = this.lastMatrix.sundayQuantity;


    switch (this.ndate.getDay()) {
      case 0:

        this.newMatrix.mondayQuantity += addOrSubQuantity;
        break;
      case 1:

        this.newMatrix.tuesdayQuantity += addOrSubQuantity;
        break;

      case 2:

        this.newMatrix.wednesdayQuantity += addOrSubQuantity;
        break;
      case 3:

        this.newMatrix.thursdayQuantity += addOrSubQuantity;
        break;
      case 4:

        this.newMatrix.fridayQuantity += addOrSubQuantity;
        break;
      case 5:

        this.newMatrix.saturdayQuantity += addOrSubQuantity;
        break;
      case 6:

        this.newMatrix.sundayQuantity += addOrSubQuantity;

        break;


    }
    this.matrixTab.push(this.lastMatrix);
    this.matrixTab.push(this.newMatrix);


    /!*On sauvegarde notre newMatrix avec date null et last matrix avec dateToday*!/
    this.matrixService.createMatrix(this.matrixTab).subscribe(rep => {
      this.matrixTab = rep;
      this.ngOnInit();
    });



  }



/*
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
*/

}
