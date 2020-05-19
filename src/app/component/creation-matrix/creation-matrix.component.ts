import { Component, OnInit } from '@angular/core';
import {MatrixService} from '../../service/matrix.service';
import {CommandService} from '../../service/command.service';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import {ActivatedRoute} from '@angular/router';
import {Matrix} from '../../model/matrix';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-creation-matrix',
  templateUrl: './creation-matrix.component.html',
  styleUrls: ['./creation-matrix.component.css']
})
export class CreationMatrixComponent implements OnInit {

  matrixList: Matrix[];
  restaurantId;
  managementForm: FormGroup;
  matrixForm: FormGroup;
  isSubmitted: boolean;
  todayDate = moment().format('YYYY-MM-DD');
  matrixDejaCree: Matrix;
  newMatrix: Matrix = new Matrix();

  constructor(private restaurantService: RestaurantService, private commandService: CommandService, private matrixService: MatrixService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      /*On top la date de URL*/
      this.restaurantId = params.get('restaurantId');




      this.matrixService.getMatrixByRestaurantId(this.restaurantId).subscribe(list =>
        this.matrixList = list);

      this.matrixForm = this.formBuilder.group({
        day: '',
        quantity: '',
        startDate: '',
        endDate: '',
        restaurantId: ''
      });

      /*this.matrixForm = this.formBuilder.group({
        pseudo: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        description: '',
        date: ['', Validators.required],
        participantNb: 0,
        label: ['', Validators.required],
        streetNumber: ['', Validators.pattern('[0-9]*')],
        street: '',
        postalCode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
        city: ['', Validators.required],
        category: ['', Validators.required]
      });*/


    });





  }

/*  getCurrentMatrix(day) {

    this.matrixService.getFirstMatrixByRestaurantIdAndDayAndStartDateBefore(this.restaurantId, day, this.todayDate).subscribe(rep => {
      let matrix: Matrix = new Matrix();
      console.log('on est dans le subscribe')
      matrix = rep;
      return matrix;
    }
    );

  }*/

  setDayOfTheWeek(numberOfDay) {
    switch (numberOfDay) {

      case 0 :
        return 'Dimanche';
        break;
      case 1 :
        return 'Lundi';
        break;
      case 2 :
        return 'Mardi';
        break;
      case 3 :
        return 'Mercredi';
        break;
      case 4 :
        return 'Jeudi';
        break;
      case 5 :
        return 'Vendredi';
        break;
      case 6 :
        return 'Samedi';
        break;

    }

  }

  addQuantity(matrix: Matrix, matrixStartDatedate, addOrSub: number) {
    matrix.quantity = matrix.quantity + addOrSub;


    this.newMatrix.day = matrix.day;
    this.newMatrix.quantity = matrix.quantity;
    this.newMatrix.startDate = this.todayDate;
    this.newMatrix.endDate = '';
    this.newMatrix.restaurantId = this.restaurantId;


    if (this.newMatrix.id === undefined) {
      console.log('newMatrix.id === undefined')
      this.matrixService.createMatrix(this.newMatrix).subscribe(rep => {
        this.newMatrix = rep;
      });
    } else {
      console.log('newMatrix.id :' + this.newMatrix.id)
      this.matrixService.updateMatrix(this.newMatrix, matrix.id).subscribe(rep => {
        this.newMatrix = rep;
      });

    }

  }

/*

  onAction(matrix: Matrix) {
    let newMatrix: Matrix = new Matrix();

    newMatrix.day = matrix.day,
      newMatrix.quantity = matrix.quantity,
      newMatrix.startDate = this.todayDate,
      newMatrix.endDate = '',
      newMatrix.restaurantId = this.restaurantId;

    console.log('on est avant le service');
    console.log(newMatrix.day);
    console.log(newMatrix.quantity);
    console.log(newMatrix.startDate);
    console.log(newMatrix.endDate);
    console.log(newMatrix.restaurantId);


    this.matrixService.createMatrix(newMatrix).subscribe(rep => {
    });
  }
*/






/*  onAction(eventForm) {

    this.isSubmitted = true;

    if (this.managementForm.invalid){
      return;
    }

    /!*creating creator object *!/
    let creatorToAddObj = {
      nickName : eventForm.pseudo,
      email : eventForm.email
    }

    /!*creating place object *!/
    let placeToAddObj = {
      label : eventForm.label,
      streetNumber : eventForm.streetNumber,
      street : eventForm.street,
      postalCode : eventForm.postalCode,
      city : eventForm.city
    }

    /!*creating category object *!/
    let categoryToAddObj = {
      category : eventForm.category
    }

    /!*creating event object *!/
    let eventToAddObj = {
      date : eventForm.date,
      description : eventForm.description,
      /!*participantNb : eventForm.participantNb,*!/
      /!*participantNb : 0,*!/
      creator : creatorToAddObj,
      place : placeToAddObj,
      eventCategory: categoryToAddObj
    }


    this.dataService.addEvent(eventToAddObj)
      .subscribe(savedEvent => {console.log(savedEvent);
        },
        error => console.log(error),
        () => {alert('nouvel événement enregistré !');

        })
  }*/

}
