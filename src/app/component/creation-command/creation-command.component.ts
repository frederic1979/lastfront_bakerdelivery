import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';

@Component({
  selector: 'app-creation-command',
  templateUrl: './creation-command.component.html',
  styleUrls: ['./creation-command.component.css']
})
export class CreationCommandComponent implements OnInit {


  restaurantId;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');

  }

}
