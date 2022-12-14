import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepperform',
  templateUrl: './stepperform.component.html',
  styleUrls: ['./stepperform.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }

    },
  ],
})

export class StepperformComponent implements OnInit, OnDestroy {

  constructor() {
  }
  
  ngOnInit() {
    //open model
    document.getElementById('Modalopen')?.click()
    
  }

  ngOnDestroy() {
    // close model
    document.getElementById('btn-close').click()

  }



}
