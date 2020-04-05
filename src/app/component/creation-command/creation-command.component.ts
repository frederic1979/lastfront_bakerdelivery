import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CommandService} from '../../service/command.service';
import { Router } from '@angular/router';
import {Command} from '../../model/command';

@Component({
  selector: 'app-creation-command',
  templateUrl: './creation-command.component.html',
  styleUrls: ['./creation-command.component.css']
})
export class CreationCommandComponent implements OnInit {


  restaurantId;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private commandService: CommandService, private router: Router) {
  }

  commandForm = this.formBuilder.group(
    {
      quantity: '',
      date: '',
      restaurantId: ''
    }
  );

  ngOnInit() {

    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');

  }


  postCommand(commandForm) {
    commandForm.restaurantId = this.restaurantId;
    this.commandService.addCommand(commandForm).subscribe(
      (response) => {
        this.router.navigate (['/restaurants', this.restaurantId]);
        console.log('resp :' + response);

      }, (err) => {
        console.log('erreur : ' + err);
      },
      () => {
        console.log('finishing posting command');

      }
    );
  }


}
