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

}
