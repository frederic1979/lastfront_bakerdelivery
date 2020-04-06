import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Command} from '../model/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private httpClient: HttpClient) { }


  getCommandsByRestaurantId(restaurantId): Observable<Command[]> {
    return this.httpClient.get<Command[]>('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId);
  }

  addCommand(command): Observable<Command> {
    return this.httpClient.post<Command>('http://localhost:8080/api/bakerdelivery/commands/', command);
  }

  getCommandsByRestaurantIdAndBetweenTwoDates(restaurantId, date, start, end) {
    if (date === null && start === null && end === null) {
      return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId);
    } else if (start === null && end === null) {
      return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId + '?date=' + date);
    } else {
      // tslint:disable-next-line:max-line-length
      return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId + '?start=' + start + '&end=' + end);
    }

  }

}

/*

http://localhost:8080/api/bakerdelivery/commands/restaurant/5
  Si tu veux les commandes du jour du restaurant ayant l'ID 5 :
http://localhost:8080/api/bakerdelivery/commands/restaurant/5?date=2020-01-02
  Et si tu veux les commandes entre 2 dates du restaurant aynat l'ID 5 :
http://localhost:8080/api/bakerdelivery/commands/restaurant/5?start=2019-02-01&end=2020-01-31*/
