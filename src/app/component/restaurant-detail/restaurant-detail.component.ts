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
  nbclic = 0;
  command: Command = new Command();
  restaurantId;
  restaurant: Restaurant = new Restaurant();

  /*Date du jour au format 2020-04-13*/
  todayDate = moment().format('YYYY-MM-DD');

  /*Date de tomorrow au format 2020-04-14*/
  tomorowDate = moment().add(1, 'days').format('YYYY-MM-DD');


  day;
  date = new Date();
  dateUrl;
  ndateUrl;
  mondayOfTheWeek;
  mondayOfTheWeek2;
  sundayOfTheWeek;
  sundayOfTheWeek2;
  matrixOfTheDay: Matrix = new Matrix(); /*sans le new Matrix , on la garde null*/
  matrixRef: Matrix = new Matrix();
  datesOfTheWeek = new Array();
  dayNumber: number;


  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService: MatrixService, private route: ActivatedRoute) {
  }


  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      /*On top la date de URL*/
      this.restaurantId = params.get('restaurantId');
      /*On top la date de URL*/
      this.dateUrl = params.get('date');
      this.ndateUrl = new Date(params.get('date'));
      this.dayNumber = this.ndateUrl.getDay();
      this.day = moment(this.dateUrl).locale('fr').format('dddd');

      /*On charge le restaurant du restaurantId*/
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe(restaurant => {
        this.restaurant = restaurant;
      });

      /*on charge la command du restaurantId, que l on va save egalement via le get*/
      this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, this.dateUrl).subscribe(command => {
        this.command = command;
      });


    });


    this.findMondayOfTheWeek(this.ndateUrl); // On obtient le mondayOfTheWeek
    this.findSundayOfTheWeek(this.mondayOfTheWeek); // On obtient le sundayOfTheWeek
    this.findMondayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);
    this.findSundayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);


    /*On construit la liste des jours de la semaine sous le compteur*/
    this.buildWeek();


  }

/*

  loadMatrixOfTheDay() { /!*qui sera soit à object avec des valeurs à null soit avec des valeurs*!/
    this.matrixService.getMatrixByRestaurantIdAndEndDateAndDay(this.restaurantId, this.dateUrl, this.dayNumber).subscribe(rep => {
      if (rep !== null) {
        this.matrixOfTheDay = rep;
        console.log('étape on charge la matrixOfTheDay, à ce niveau elle a des valeurs');
      }
    });

  }


  loadMatrixRef() {

    /!*on charge la matrixRef*!/
    this.matrixService.getMatrixByRestaurantIdAndEndDateAndDay(this.restaurantId, '', this.dayNumber).subscribe(rep => {

      if (this.matrixOfTheDay.id !== undefined) { /!*si la this.matrixOfTheDay a un id , alors on remplace la matrixRef par matrixOfTheDay*!/
        this.matrixRef = this.matrixOfTheDay;
        console.log('étape on charge la matrixRef avec la matrixOfTheDay qui existe à ce niveau');

      } else {/!*sinon la matrixRef est celle avec la date à null*!/
        this.matrixRef = rep;
        console.log('étape on charge la matrixRef avec les endate à null');
      }


    });
  }
*/


  buildWeek() {
    this.datesOfTheWeek.splice(0);

    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(1, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(2, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(3, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(4, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(5, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(6, 'days').format('YYYY-MM-DD'));

    this.datesOfTheWeek.splice(0, this.datesOfTheWeek.indexOf(this.tomorowDate));

  }

  getNextWeek() {
    this.nbclic++;
    this.datesOfTheWeek.splice(0);

    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(7 * this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(1 + 7 * this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(2 + 7 * this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(3 + 7 * this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(4 + 7 * this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(5 + 7 * this.nbclic, 'days').format('YYYY-MM-DD'));
    this.datesOfTheWeek.push(moment(this.mondayOfTheWeek).add(6 + 7 * this.nbclic, 'days').format('YYYY-MM-DD'));
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

  updateCommand(addOrSubQuantity) {
    this.command.quantity = this.command.quantity + addOrSubQuantity;

    this.commandService.updateCommand(this.command, this.command.id).subscribe(rep => {
        this.command = rep;
      }
    );
    this.ngOnInit();
  }



}


