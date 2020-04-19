import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../model/restaurant';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';
import * as moment from 'moment';
import {MatrixService} from '../../service/matrix.service';
import {Matrix} from '../../model/matrix';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  command: Command = new Command();
  restaurantId;
  restaurant: Restaurant = new Restaurant();
  newCommand: Command = new Command();
  futurCommand: Command = new Command();


  /*Date end qui vaut  jourJ + 30*/
  end = moment().add(30, 'days').format('YYYY-MM-DD');


  /*Date du jour au format 2020-04-13*/
  todayDate = moment().format('YYYY-MM-DD');

  /*Date de tomorrow au format 2020-04-14*/
  tomorowDate = moment().add(1, 'days').format('YYYY-MM-DD');

  /*Date de After tomorrow au format 2020-04-14*/
  afterTomorrowDate = moment(this.tomorowDate).add(1, 'days').format('YYYY-MM-DD');

  /*Jour de tomorrowDay*/
  tomorrowDay = moment().locale('fr').add(1, 'days').format('dddd');

  x: Command = new Command();
  y: Command = new Command();
  z: Command = new Command();

    addOrSubQuantity: number;

  date = new Date();
  mondayOfTheWeek;
  mondayOfTheWeek2;
  sundayOfTheWeek;
  sundayOfTheWeek2;


  newMatrix: Matrix = new Matrix();
  lastMatrix: Matrix = new Matrix();

  commandsListOfTheWeek: Command[] = new Array();
  newCommandsListOfTheWeek: Command[] = new Array();



  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService: MatrixService, private route: ActivatedRoute) {
  }


  ngOnInit() {


    this.futurCommand.date = this.tomorowDate;

    /*On recup le restauraurantId de l url*/
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');

    /*On charge le restaurant du restaurantId*/
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
      this.restaurant = rep;
    });

    /*On charge la commande du restaurantId à la date de tomorowDate*/
    this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, this.tomorowDate).subscribe(rep => {
      this.command = rep;
    });



    this.findMondayOfTheWeek(this.date); // On obtient le mondayOfTheWeek
    this.findSundayOfTheWeek(this.mondayOfTheWeek); // On obtient le sundayOfTheWeek
    this.findMondayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);
    this.findSundayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);

    if (this.commandsListOfTheWeek.length === 0) {
      // tslint:disable-next-line:max-line-length
      this.commandService.getCommandsByRestaurantIdAndBetweenTwoDates(this.restaurantId, this.mondayOfTheWeek, this.sundayOfTheWeek).subscribe(rep => {
        this.commandsListOfTheWeek = rep;
      });
    }

    /*On charge la derniere matrix avec endDate à null*/

    this.matrixService.getMatrixByRestaurantIdAndEndDate(this.restaurantId, '').subscribe(rep => {
        this.lastMatrix = rep;

      });


    this.getQuantityByRestaurantIdAndDate(this.todayDate);

  }


  getNextWeek() {
    for (const command of this.commandsListOfTheWeek) {
      // tslint:disable-next-line:max-line-length
      this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, moment(command.date).add(7, 'days').format('YYYY-MM-DD')).subscribe(rep => {
        this.y = rep;
        this.newCommandsListOfTheWeek.push(this.y);
        this.commandsListOfTheWeek = this.newCommandsListOfTheWeek;
      });
    }
    this.newCommandsListOfTheWeek = this.newCommandsListOfTheWeek.slice(0, 0);
  }


  findMondayOfTheWeek(date) {
    switch (date.getDay()) {
      case 0:

        this.mondayOfTheWeek = moment(date).subtract(6, 'days').format('YYYY-MM-DD');
        break;

      case 1:

        this.mondayOfTheWeek = moment(date).format('YYYY-MM-DD');
        break;

      case 2:

        this.mondayOfTheWeek = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case 3:

        this.mondayOfTheWeek = moment(date).subtract(2, 'days').format('YYYY-MM-DD');
        break;
      case 4:

        this.mondayOfTheWeek = moment(date).subtract(3, 'days').format('YYYY-MM-DD');
        break;
      case 5:

        this.mondayOfTheWeek = moment(date).subtract(4, 'days').format('YYYY-MM-DD');
        break;
      case 6:

        this.mondayOfTheWeek = moment(date).subtract(5, 'days').format('YYYY-MM-DD');
        break;

      default:

    }
  }

  findSundayOfTheWeek(date) {
    this.sundayOfTheWeek = moment(this.todayDate).add(3, 'days').format('YYYY-MM-DD');
  }

  findMondayOfTheWeekInFrenchFormat(date) {
    this.mondayOfTheWeek2 = moment(date).locale('fr').format('L');
  }

  findSundayOfTheWeekInFrenchFormat(date) {
    this.sundayOfTheWeek2 = moment(date).locale('fr').format('L');
  }



  displayDateDayMonth(date) {

    return moment(date).locale('fr').format('DD-MM');
    /*return moment(date).locale('fr').format('dddd').substr(0, 2);*/
  }


  displayMonth(date) {

    return moment(date).locale('fr').format('MMMM');
    /*return moment(date).locale('fr').format('dddd').substr(0, 2);*/
  }

  displayNumberDay(date) {
    return moment(date).locale('fr').format('DD');
  }

  displayThreeCharacterDay(date) {
    return moment(date).locale('fr').format('ddd');
  }


  getQuantityByRestaurantIdAndDate(date) {
    this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, date).subscribe(rep => {
      this.z = rep;

    });
    return this.z.quantity;
  }


  createNewMatrix(newCommand) {
    /*this.newMatrix = this.lastMatrix;*/
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


    switch (this.date.getDay()) {
      case 0:

        this.newMatrix.mondayQuantity = newCommand.quantity;
        break;
      case 1:

        this.newMatrix.tuesdayQuantity = newCommand.quantity;
        break;

      case 2:

        this.newMatrix.wednesdayQuantity = newCommand.quantity;
        break;
      case 3:

        this.newMatrix.thursdayQuantity = newCommand.quantity;
        break;
      case 4:

        this.newMatrix.fridayQuantity = newCommand.quantity;
        break;
      case 5:

        this.newMatrix.saturdayQuantity = newCommand.quantity;
        break;
      case 6:

        this.newMatrix.sundayQuantity = newCommand.quantity;

        break;


    }


    this.lastMatrix.endDate = this.todayDate;
    this.matrixService.updateMatrix(this.lastMatrix).subscribe(rep => {
    });

    this.matrixService.createMatrix(this.newMatrix).subscribe(rep => {
           this.newMatrix = rep;
    });


/*    if (this.newMatrix !== this.lastMatrix) {
    this.matrixService.createMatrix(this.newMatrix).subscribe(rep => {
      this.newMatrix = rep;
    });
    } else {
      this.matrixService.updateMatrix(this.newMatrix).subscribe(rep => {
      });
    }
    this.lastMatrix.endDate = '2000-01-01';
    this.newMatrix.endDate = '';
    this.matrixService.updateMatrix(this.lastMatrix).subscribe(rep => {
    });*/

  }

  updateCommand(command: Command, addQuantity) {

    this.newCommand.id = command.id;
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + addQuantity;
    this.newCommand.restaurantId = this.restaurantId;


    this.commandService.updateCommand(this.newCommand).subscribe(
      (response) => {
        console.log('resp :' + response);
        this.createNewMatrix(this.newCommand);

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


