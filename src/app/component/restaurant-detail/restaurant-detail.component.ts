import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../model/restaurant';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';
import * as moment from 'moment';
import {MatrixService} from '../../service/matrix.service';
import {Matrix} from '../../model/matrix';
import {element} from 'protractor';

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



  x: Command = new Command();
  y: Command = new Command();
  z: Command = new Command();

    addOrSubQuantity: number;
day;
  date = new Date();
  dateUrl;
  ndateUrl;
  mondayOfTheWeek;
  mondayOfTheWeek2;
  sundayOfTheWeek;
  sundayOfTheWeek2;

  nbclic = 0;

  a: number;

  matrixOfTheDay: Matrix;
  matrixWithEndDateNull: Matrix;

  matrixTab: Matrix[] = new Array();
  newMatrix: Matrix = new Matrix();
  lastMatrix: Matrix = new Matrix();
  datesOfTheWeek = new Array();

  commandsListOfTheWeek: Command[] = new Array();
  newCommandsListOfTheWeek: Command[] = new Array();



  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService: MatrixService, private route: ActivatedRoute) {
  }


  ngOnInit() {


    this.futurCommand.date = this.tomorowDate;

    /*On top la date de URL*/
    this.dateUrl = this.route.snapshot.paramMap.get('date');
    this.ndateUrl = new Date(this.dateUrl);

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


    this.day = moment(this.dateUrl).locale('fr').format('dddd');


    this.findMondayOfTheWeek(this.ndateUrl); // On obtient le mondayOfTheWeek
    this.findSundayOfTheWeek(this.mondayOfTheWeek); // On obtient le sundayOfTheWeek
    this.findMondayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);
    this.findSundayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);

    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(1, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(2, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(3, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(4, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(5, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(6, 'days').format('YYYY-MM-DD'));


    if (this.commandsListOfTheWeek.length === 0) {
      // tslint:disable-next-line:max-line-length
      this.commandService.getCommandsByRestaurantIdAndBetweenTwoDates(this.restaurantId, this.mondayOfTheWeek, this.sundayOfTheWeek).subscribe(rep => {
        this.commandsListOfTheWeek = rep;
      });
    }


    if (this.newMatrix.id === undefined) {
      this.matrixService.getMatrixByRestaurantIdAndEndDate(this.restaurantId, '').subscribe(rep => {
        console.log('la newmatrice n est pas crée');
        this.lastMatrix = rep;
      });
    } else {
      console.log('on est dans le else, la newmatrice existe deja');
      this.lastMatrix = this.newMatrix;
    }

    this.matrixService.getMatrixByRestaurantIdAndEndDate(this.restaurantId, this.dateUrl).subscribe(rep => {

      if (rep !== null) {
        this.newMatrix = rep;
        this.lastMatrix = this.newMatrix;
      }
    });







  }
  getNextWeek() {
    this.nbclic++;

    this.datesOfTheWeek.splice(0);
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(6 + this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(7 + this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(8 + this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(9 + this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(10 + this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(11 + this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(12 + this.nbclic, 'days').format('YYYY-MM-DD'));
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


  /*Renvoi la quantité du jour*/
  getDayQuantityTomorrow(date): number {
    switch (date.getDay()) {
      case 0:

        return this.lastMatrix.sundayQuantity;
        break;
      case 1:

        return this.lastMatrix.mondayQuantity;
        break;

      case 2:

        return this.lastMatrix.tuesdayQuantity;
        break;
      case 3:

        return this.lastMatrix.wednesdayQuantity;
        break;
      case 4:

        return this.lastMatrix.thursdayQuantity;
        break;
      case 5:

        return this.lastMatrix.fridayQuantity;
        break;
      case 6:

        return this.lastMatrix.saturdayQuantity;

        break;

    }
  }

  /*Qd on clic sur un des boutons plus ou moins*/
  updateMatrix(addOrSubQuantity) {
    console.log('juste apres le update' );

    this.newMatrix.restaurantId = this.restaurantId;
    this.newMatrix.startDate = this.todayDate;
    this.newMatrix.endDate = this.dateUrl;

    this.newMatrix.mondayQuantity = this.lastMatrix.mondayQuantity;
    this.newMatrix.tuesdayQuantity = this.lastMatrix.tuesdayQuantity;
    this.newMatrix.wednesdayQuantity = this.lastMatrix.wednesdayQuantity;
    this.newMatrix.thursdayQuantity = this.lastMatrix.thursdayQuantity;
    this.newMatrix.fridayQuantity = this.lastMatrix.fridayQuantity;
    this.newMatrix.saturdayQuantity = this.lastMatrix.saturdayQuantity;
    this.newMatrix.sundayQuantity = this.lastMatrix.sundayQuantity;


    switch (this.ndateUrl.getDay()) {
      case 0:

        this.newMatrix.sundayQuantity += addOrSubQuantity;
        break;
      case 1:

        this.newMatrix.mondayQuantity += addOrSubQuantity;
        break;

      case 2:

        this.newMatrix.tuesdayQuantity += addOrSubQuantity;
        break;
      case 3:

        this.newMatrix.wednesdayQuantity += addOrSubQuantity;
        break;
      case 4:

        this.newMatrix.thursdayQuantity += addOrSubQuantity;
        break;
      case 5:

        this.newMatrix.fridayQuantity += addOrSubQuantity;
        break;
      case 6:

        this.newMatrix.saturdayQuantity += addOrSubQuantity;

        break;


    }


    if (this.newMatrix.id !== undefined) {
      console.log('on va faire le update');
      this.matrixService.updateMatrix(this.newMatrix, this.newMatrix.id).subscribe(rep => {
        this.newMatrix = rep;
        this.ngOnInit();
      });
    } else {
      console.log('creation matrice');
      this.matrixService.createMatrix(this.newMatrix).subscribe(rep => {
        this.newMatrix = rep;
        this.ngOnInit();
      });
    }

  }


  /*createNewMatrix(newCommand) {

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


    this.matrixTab.push(this.lastMatrix);
    this.matrixTab.push(this.newMatrix);


    this.matrixService.createMatrix(this.matrixTab).subscribe(rep => {
      this.matrixTab = rep;

    });

  }


  /!*Quand on clic sur button + ou -*!/
  updateCommand(command: Command, addQuantity) {

    /!*on crée la newCommand qui sera la meme que command en cours + addQuantity*!/
    this.newCommand.id = command.id;
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + addQuantity;
    this.newCommand.restaurantId = this.restaurantId;

    /!*on update la newcommand qui est en fait la commande*!/
    this.commandService.updateCommand(this.newCommand).subscribe(
      (response) => {
        console.log('resp :' + response);

        /!*pendant l update on en lance creation  de la newMatrix et la mise à jour de lastMatrix.endDate*!/
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

*/


}


