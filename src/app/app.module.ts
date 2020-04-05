import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { WelcomePageComponent } from './component/welcome-page/welcome-page.component';
import { RestaurantListComponent } from './component/restaurant-list/restaurant-list.component';
import { RestaurantSheetComponent } from './component/restaurant-sheet/restaurant-sheet.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { FooterComponent } from './component/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { CreationCommandComponent } from './component/creation-command/creation-command.component';
import {RestaurantDetailComponent} from './component/restaurant-detail/restaurant-detail.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RestaurantListComponent,
    RestaurantSheetComponent,
    TopBarComponent,
    FooterComponent,
    RestaurantDetailComponent,
    CreationCommandComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: WelcomePageComponent},
      {path: 'restaurants', component: RestaurantListComponent},
      {path: 'restaurants/:restaurantId', component: RestaurantDetailComponent},
      {path: 'creationCommand/:restaurantId', component: CreationCommandComponent},
      /*  { path: 'director/:directorId', component: DirectorSheetComponent },
   { path: 'addamovie', component: AddAMoviePageComponent }*/
    ]),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
