import {Component, OnInit} from '@angular/core';
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

  command: Command = new Command();
  restaurantId;
  restaurant: Restaurant = new Restaurant();
  newCommand: Command = new Command();
  futurCommand: Command = new Command();
  testCommand2: Command = new Command();

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

    addOrSubQuantity: number;

  date = new Date();
  mondayOfTheWeek;
  mondayOfTheWeek2;
  sundayOfTheWeek;
  sundayOfTheWeek2;

  commandsListOfTheWeek: Command[] = new Array();
  newCommandsListOfTheWeek: Command[] = new Array();
  testCommandsListOfTheWeek: Command[] = new Array();


  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private route: ActivatedRoute) {
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


  pastCommandByRestaurantIdAndDate(date) {
    // tslint:disable-next-line:max-line-length
    if (date === this.afterTomorrowDate) {
      /*this.bool = false;*/
    } else {
      // tslint:disable-next-line:max-line-length
      this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, moment(date).subtract(1, 'days').format('YYYY-MM-DD')).subscribe(rep => {
        this.futurCommand = rep;
      });
    }
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


