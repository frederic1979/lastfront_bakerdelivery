import {Component, OnInit, ViewChild} from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';
import * as moment from 'moment';
import {Restaurant} from '../../model/restaurant';
import {MatrixService} from '../../service/matrix.service';
import {Matrix} from '../../model/matrix';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name'];


  mondayOfTheWeek;
  mondayOfTheWeek2;
  sundayOfTheWeek;
  sundayOfTheWeek2;


  matrixList: Matrix[] = new Array();
  commandsList: Command[] = new Array();
  restaurantList: Restaurant[] = new Array();
  date = new Date();
  numberOfActualWeek;


  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService : MatrixService) {
  }


  ngOnInit() {
    /*On ne recharge la commandList seulement si elle est vide*/
    if (this.commandsList.length === 0) {
      this.commandService.getCommands().subscribe(rep => {
        this.commandsList = rep;

      });
    }

    /*On ne recharge la restaurantList seulement si elle est vide*/
    if (this.restaurantList.length === 0) {
      this.restaurantService.getRestaurantList().subscribe(rep => {
          this.restaurantList = rep;
        }
      );
    }

    this.matrixService.getMatrix().subscribe(rep => {
      this.matrixList = rep;

    });


    this.numberOfActualWeek = moment().format('w');
    this.findMondayOfTheWeek(this.date); // On obtient le mondayOfTheWeek
    this.findSundayOfTheWeek(this.mondayOfTheWeek); // On obtient le sundayOfTheWeek
    this.findMondayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);
    this.findSundayOfTheWeekInFrenchFormat(this.mondayOfTheWeek);

  }

findNextNumberWeek(){
    return moment().add(1, 'week').format('w');
}


  findMondayOfTheWeek(date) {
    switch (date.getDay()) {
      case 0:

        this.mondayOfTheWeek = moment(date).add(1, 'days').format('YYYY-MM-DD');
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
    this.sundayOfTheWeek = moment().add(6, 'days').format('YYYY-MM-DD');
  }

  findMondayOfTheWeekInFrenchFormat(date) {
    this.mondayOfTheWeek2 = moment(date).locale('fr').format('L');
  }

  findSundayOfTheWeekInFrenchFormat(date) {
    this.sundayOfTheWeek2 = moment(date).locale('fr').format('L');
  }

  findOtherDayOfTheWeek(date, x) {
    return moment(date).add(x, 'days').format('YYYY-MM-DD');
  }


  getQuantityCommandByRestauIdAndDate(restaurantId, date) {
    for (const command of this.commandsList) {
      if (command.restaurantId === restaurantId && command.date === date) {
        return  command.quantity;
      }
    }
  }






}
