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

  getMatrixById(matrixId): Observable<Matrix> {
    return this.httpClient.get<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/restaurant/' + matrixId);
  }

  createMatrix(matrix: Matrix): Observable<Matrix> {
    return this.httpClient.post<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/', matrix);
  }

  updateMatrix(matrix, matrixId): Observable<Matrix> {
    return this.httpClient.put<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/' + matrixId, matrix);
  }

  getMatrixByRestaurantIdAndEndDate(restaurantId, endDate): Observable<Matrix> {
    return this.httpClient.get<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/restaurants/' + restaurantId + '?endDate=' + endDate);
  }

  getMatrixByRestaurantIdAndEndDateNullAndStartDateBetweenBeginAndFinish(restaurantId, start, end): Observable<Matrix> {
    return this.httpClient.get<Matrix>('http://localhost:8080/api/bakerdelivery/matrix/' + restaurantId + '/between' + '?begin=' + start + '&finish=' + end);
  }

  getMatrixByEndDateNullAndStartDatePassed(start, end): Observable<Matrix[]> {
    return this.httpClient.get<Matrix[]>('http://localhost:8080/api/bakerdelivery/matrix/between/' + '?begin=' + start + '&finish=' + end);
  }


}
