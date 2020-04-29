import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { WelcomePageComponent } from './component/welcome-page/welcome-page.component';
import { RestaurantListComponent } from './component/restaurant-list/restaurant-list.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { FooterComponent } from './component/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { CreationCommandComponent } from './component/creation-command/creation-command.component';
import {RestaurantDetailComponent} from './component/restaurant-detail/restaurant-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DeliveryOnboardComponent } from './component/delivery-onboard/delivery-onboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSliderModule, MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RestaurantListComponent,
    TopBarComponent,
    FooterComponent,
    RestaurantDetailComponent,
    CreationCommandComponent,
    DeliveryOnboardComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: WelcomePageComponent},
      {path: 'restaurants', component: RestaurantListComponent},
      {path: 'restaurants/:restaurantId/:date', component: RestaurantDetailComponent},
      {path: 'creationCommand/:restaurantId', component: CreationCommandComponent},
      {path: 'onboard', component: DeliveryOnboardComponent},

      /*{path: 'restaurants/:restaurantId/futurCommand/:date', component: FuturCommandComponent},*/

    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSliderModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
