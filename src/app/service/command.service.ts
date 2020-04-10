import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Command} from '../model/command';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private httpClient: HttpClient) { }

  getCommands(): Observable<Command[]> {
    return this.httpClient.get<Command[]>('http://localhost:8080/api/bakerdelivery/commands/');
  }

  getCommandsByRestaurantId(restaurantId): Observable<Command> {
    return this.httpClient.get<Command>('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId);
  }

  addCommand(command): Observable<Command> {
    return this.httpClient.post<Command>('http://localhost:8080/api/bakerdelivery/commands/', command);
  }

  updateCommand(command) {
    return this.httpClient.put('http://localhost:8080/api/bakerdelivery/commands/' + command.id, command);
  }

  getCommandsByRestaurantIdAndBetweenTwoDates(restaurantId, date, start, end) {
    if (date === null && start === null && end === null) {
      return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId);
    } else if (start === null && end === null) {
      return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + 2 + '?date=' + date);
    } else {
      // tslint:disable-next-line:max-line-length
      return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId + '?start=' + start + '&end=' + end);
    }

  }

  getCommandsByEtat(etat, date) {
    return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/etat/' + etat + '?date=' + date);
  }



}



