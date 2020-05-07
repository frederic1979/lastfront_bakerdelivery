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

  getCommandByCommandId(commandId): Observable<Command> {
    return this.httpClient.get<Command>('http://localhost:8080/api/bakerdelivery/commands/' + commandId);
  }

  getCommandsByRestaurantId(restaurantId): Observable<Command[]> {
    return this.httpClient.get<Command []>('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId);
  }

  getCommandByRestaurantIdAndDate(restaurantId, date): Observable<Command> {
    return this.httpClient.get<Command>('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId + '?date=' + date);
  }

  getCommandsByRestaurantIdAndBetweenTwoDates(restaurantId, start, end): Observable<Command[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Command[]>('http://localhost:8080/api/bakerdelivery/commands/restaurant/' + restaurantId + '/datesbetween?start=' + start + '&end=' + end);
  }


  getCommandsByEtat(etat, date) {
    return this.httpClient.get('http://localhost:8080/api/bakerdelivery/commands/etat/' + etat + '?date=' + date);
  }

  addCommand(command): Observable<Command> {
    return this.httpClient.post<Command>('http://localhost:8080/api/bakerdelivery/commands/', command);
  }

  updateCommand(command) {
    return this.httpClient.put('http://localhost:8080/api/bakerdelivery/commands/' + command.id, command);
  }




}



