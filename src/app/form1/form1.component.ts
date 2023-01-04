import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ICountry, IState, ICity } from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {

  @ViewChild('ngform1') form1GroupDirective: NgForm
  public firstFormGroup: FormGroup;
  public countries: ICountry[];
  public states: IState[];
  public cities: ICity[];
  public countryCode: string
  public countryControls: AbstractControl
  public stateControls: AbstractControl
  public countryCodes: string
  public country: { isoCode: string; }[]
  public state: IState[];
  cityControls: AbstractControl;


  constructor(
    private formBuilder: FormBuilder,
    private service: FormService,
    private router: Router,
    private toast: ToastrService) {
    this.firstForm();

  }

  ngOnInit(): void {
    this.getAllCountry();
    this.getState();
    this.getCity();

  }

  firstForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      airlineProgram: [''],
      frequentFlyers: [''],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[1-9][0-9\-\(\)\.]{7,32}$')]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]]

    });

  }

  getAllCountry(): void {
    this.countries = this.service.getCountries();
    // console.log(this.countries);

  }

  // ** when the Country select field is selected 
  getState(): void {
    // ** abstract Controls 
    this.countryControls = this.firstFormGroup.controls['country'];
    this.countryControls.valueChanges.subscribe((countryName: string) => {
      // ** getting country - filtering by country-name
      this.country = this.countries.filter((countyObj) => {
        return countyObj.name === countryName
      })
      // console.log("individual country",this.country);
      // console.log(this.country[0]);

      //** getting State       
      this.states = this.service.getStatesByCountry(this.country[0].isoCode);
      console.log("Total-state ", this.states);

    });

  }

  // * when the STATE select field is selected 
  getCity(): void {
    // ** abstract Controls **//
    this.stateControls = this.firstFormGroup.controls['state'];
    this.stateControls.valueChanges.subscribe((stateName: string) => {
      // ** getting state - filtering by state-name
      this.state = this.states.filter((stateObj) => {
        return stateObj.name === stateName
      })
      // console.log("inidividual state",this.state);
      // console.log(this.state);
      //** getting city*//
      this.cities = this.service.getCitiesByState(this.country[0].isoCode, this.state[0].isoCode)
      console.log(this.cities);


    })
  }

  sendFormData(): void {
    
    // console.log(this.firstFormGroup);
    
    // user can proceed once they logged-in
    if (localStorage.getItem("token")) {
      this.service.form1$.next(this.firstFormGroup)
      this.service.form1Dir$.next(this.form1GroupDirective)
      
    } else {
      this.toast.warning("kindly login and proceed")
      this.router.navigateByUrl("/login")
    }


  }

}


