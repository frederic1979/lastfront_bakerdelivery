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
  day;

  dateToday = new Date();
  end = moment().add(30, 'days').format('YYYY-MM-DD');

  todayDate = moment().format('YYYY-MM-DD');
  tomorowDate = moment(this.dateToday).add(1, 'days').format('YYYY-MM-DD');
  afterTomorrowDate = moment(this.tomorowDate).add(1, 'days').format('YYYY-MM-DD');
  tomorrowDay = moment().locale('fr').add(1, 'days').format('dddd');

  dueDate = moment().add(15, 'days').format('DD-MM-YYYY');
  bool: boolean;


  addOrSubQuantity: number;

  x: Date;




  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    this.bool = false;
    this.futurCommand.date = this.tomorowDate

    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(rep => {
      this.restaurant = rep;
    });


    this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, this.tomorowDate).subscribe(rep => {
      this.command = rep;
    });


  }

  getCommandByRestaurantIdAndDate(date) {
      // tslint:disable-next-line:max-line-length
    this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, moment(date).add(1, 'days').format('YYYY-MM-DD')).subscribe(rep => {
      this.futurCommand = rep;
      this.bool = true;
    });
  }

  pastCommandByRestaurantIdAndDate(date) {
    // tslint:disable-next-line:max-line-length
    if (date === this.afterTomorrowDate) {
      this.bool = false;
    } else {
      // tslint:disable-next-line:max-line-length
      this.commandService.getCommandByRestaurantIdAndDate(this.restaurantId, moment(date).subtract(1, 'days').format('YYYY-MM-DD')).subscribe(rep => {
        this.futurCommand = rep;
      });
    }
  }

  displayDayOfDate(date) {
    return moment(date).locale('fr').format('dddd');
  }

  displayFrenchDate(date) {
    return moment(date).locale('fr').format('L');
  }


  dateTomorrow(date) {
    return moment(date).add(1, 'days').format('YYYY-MM-DD');
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
  dayDate(date) {
    this.day = moment(date).locale('fr').format('dddd');
  }

  updateFuturCommand(command: Command, addQuantity) {

    this.newCommand.id = command.id;
    this.newCommand.date = command.date;
    this.newCommand.quantity = command.quantity + addQuantity;
    this.newCommand.restaurantId = this.restaurantId;
    /*  command.quantity = command.quantity + addQuantity;*/

    this.commandService.updateCommand(this.newCommand).subscribe(
      (response) => {
        console.log('resp :' + response);
        console.log('Mon commandId est : ' + this.newCommand.id);
        console.log('on est à : ' + this.newCommand.quantity);

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('end');
      }
    );

  }
}


