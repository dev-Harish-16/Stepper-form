import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, }

    },
  ],
})

export class AppComponent  {

  title = 'airlinesTravel';
  

  constructor() {
   
  }
 


}

