import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {CommandService} from '../../service/command.service';
import {Command} from '../../model/command';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  commandsList;
  restaurantList;
  commanda: Command;
  date = '2020-03-30';


  constructor(private restaurantService: RestaurantService, private commandService: CommandService) {
  }

  ngOnInit() {
    this.commandService.getCommands().subscribe(rep => {
      this.commandsList = rep;

    });

    this.restaurantService.getRestaurantList().subscribe(rep => {
      this.restaurantList = rep;

    });


  }

  getQuantityCommandByRestauIdAndDate(restaurantId, date) {
    for (const command of this.commandsList) {
      if (command.restaurantId === restaurantId && command.date === date) {
        return  command.quantity;
      }
    }
  }


  /*

    getCommandsListByRestaurantId(restaurantId) {
      this.commandService.getCommandsByRestaurantId(restaurantId).subscribe(
        (response) => {
          console.log('resp :' + response);

          console.log(this.commanda.quantity);
        }, (err) => {
          console.log('erreur : ' + err);
        },
        () => {
          console.log('end');
        }
      );
    }
  */


  /*getCommandByRestaurantIdAndDate(restaurantId) {

    this.commandService.getCommandsByRestaurantIdAndBetweenTwoDates(restaurantId, this.date, null, null).subscribe(
      (response) => {
        console.log('resp :' + response);
        this.commanda = response;
        console.log(this.commanda.quantity);
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
