
import { NumberInput } from '@angular/cdk/coercion';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-stepperform',
  templateUrl: './stepperform.component.html',
  styleUrls: ['./stepperform.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, }

    },
  ],
})
export class StepperformComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    document.getElementById('Modalopen')?.click()

  }



}
