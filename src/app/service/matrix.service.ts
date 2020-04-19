import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Command} from '../model/command';
import {Matrix} from '../model/matrix';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor(private httpClient: HttpClient) { }

  getMatrix(): Observable<Matrix[]> {
    return this.httpClient.get<Matrix[]>('http://localhost:8080/api/bakerdelivery/matrix/');
  }

  getMatrixById(matrix): Observable<Matrix> {
    return this.httpClient.get<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/restaurant/' + matrix.id);
  }

  createMatrix(matrix): Observable<Matrix> {
    return this.httpClient.post<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/', matrix);
  }

  updateMatrix(matrix: Matrix): Observable<Matrix>  {
    return this.httpClient.put<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/' + matrix.id, matrix);
  }

  getMatrixByRestaurantIdAndEndDate(restaurantId, endDate): Observable<Matrix> {
        return this.httpClient.get<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/restaurants/' + restaurantId + '?endDate=' + endDate);
  }

}
