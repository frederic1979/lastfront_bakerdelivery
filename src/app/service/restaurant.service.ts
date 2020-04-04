import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) {
  }


  getRestaurantById(restaurantId) {
    return this.httpClient.get('http://localhost:8080/api/bakerdelivery/restaurants/' + restaurantId);
  }

  getRestaurantList() {
    return this.httpClient.get('http://localhost:8080/api/bakerdelivery/restaurants/');
  }


}
