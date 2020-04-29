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

  matrixOfTheDay: Matrix = new Matrix();
  matrixWithEndDateNull: Matrix;

  matrixTab: Matrix[] = new Array();

  matrixRef: Matrix = new Matrix();
  datesOfTheWeek = new Array();

  commandsListOfTheWeek: Command[] = new Array();
  newCommandsListOfTheWeek: Command[] = new Array();
  dayNumber: number;


  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService: MatrixService, private route: ActivatedRoute) {
  }


  ngOnInit() {


    this.futurCommand.date = this.tomorowDate;

    /*On top la date de URL*/
    this.route.paramMap.subscribe(params => {
      this.dateUrl = params.get('date');
      this.ndateUrl = new Date(params.get('date'));
      this.dayNumber = this.ndateUrl.getDay();
      this.day = moment(this.dateUrl).locale('fr').format('dddd');
    })



    /*On recup le restauraurantId de l url*/
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');

    /*On charge le restaurant du restaurantId*/
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
      this.restaurant = rep;
    });





    this.findMondayOfTheWeek(this.ndateUrl); // On obtient le mondayOfTheWeek
    this.findSundayOfTheWeek(this.mondayOfTheWeek); // On obtient le sundayOfTheWeek
    this.findMondayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);
    this.findSundayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);

    this.datesOfTheWeek.splice(0);
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(1, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(2, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(3, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(4, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(5, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(6, 'days').format('YYYY-MM-DD'));



    if (this.matrixOfTheDay.id === undefined) {
      this.matrixService.getMatrixByRestaurantIdAndEndDateAndDay(this.restaurantId, '', this.dayNumber).subscribe(rep => {
        console.log('la newmatrice n est pas crée');
        this.matrixRef = rep;
      });
    } else {
      console.log('on est dans le else, la newmatrice existe deja');
      this.matrixRef = this.matrixOfTheDay;
    }

    this.matrixService.getMatrixByRestaurantIdAndEndDate(this.restaurantId, this.dateUrl).subscribe(rep => {

      if (rep !== null) {
        this.matrixOfTheDay = rep;
        this.matrixRef = this.matrixOfTheDay;
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


/*
  /!*Renvoi la quantité du jour*!/
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
  }*/

  /*Qd on clic sur un des boutons plus ou moins*/
  updateMatrix(addOrSubQuantity) {
    console.log('juste apres le update' );

    this.matrixOfTheDay.restaurantId = this.restaurantId;
    this.matrixOfTheDay.startDate = this.todayDate;
    this.matrixOfTheDay.endDate = this.dateUrl;
    this.matrixOfTheDay.day = this.matrixRef.day;
    this.matrixOfTheDay.quantity = this.matrixRef.quantity;

    this.matrixOfTheDay.quantity += addOrSubQuantity;

    /*Si pas encore de matrice de creer specifiquement pour ce jour on en crée une*/
    if (this.matrixOfTheDay.id === undefined /*&& this.newMatrix.endDate !== this.tomorowDate*/) {
      console.log('creation matrice');
      this.matrixService.createMatrix(this.matrixOfTheDay).subscribe(rep => {
        this.matrixOfTheDay = rep;

      });
      this.ngOnInit();
      /*sinon on met à jour la new matrice du jour*/
    } else {
      console.log('on va faire le update');
      this.matrixService.updateMatrix(this.matrixOfTheDay, this.matrixOfTheDay.id).subscribe(rep => {
        this.matrixOfTheDay = rep;

      });
      this.ngOnInit();
    }

  }



}


