import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICountry, IState, ICity } from 'country-state-city';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  public firstFormGroup: FormGroup;
  public countries: ICountry[];
  public states: IState[];
  public cities: ICity[];
  public countryCode: string
  public countryControls: AbstractControl
  public stateControls: AbstractControl
  public countryCodes: string
  public countryIsoCode: { isoCode: string; }[]
  public stateIsoCode: IState[];

  constructor(private formBuilder: FormBuilder, private service: CountryService) {
    this.firstForm();

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
  getState(): void {
    // ** abstract Controls **//
    this.countryControls = this.firstFormGroup.controls['country'];
    this.countryControls.valueChanges.subscribe((country: string) => {
      // ** getting countryIsoCode by filtering
      this.countryIsoCode = this.countries.filter((countyObj) => {
        return countyObj.name === country
      })
      console.log(this.countryIsoCode[0].isoCode);
      if (country) {
        //** getting State **//       
        this.states = this.service.getStatesByCountry(this.countryIsoCode[0].isoCode);
        console.log(this.states);
      }
    });
  }
  getCity(): void {
    // ** abstract Controls **//
    this.stateControls = this.firstFormGroup.controls['state'];
    this.stateControls.valueChanges.subscribe((state: string) => {
      // ** getting stateIsoCode by filtering
      this.stateIsoCode = this.states.filter((sateObj) => {
        return sateObj.name === state
      })
      console.log(this.stateIsoCode[0].isoCode);
      if (state) {
        //** getting city*//
        this.cities = this.service.getCitiesByState(this.countryIsoCode[0].isoCode, this.stateIsoCode[0].isoCode)
        console.log(this.cities);

      }
    })
  }

  ngOnInit(): void {
    document.getElementById('Modalopen')?.click()
    this.getAllCountry();
    this.getState();
    this.getCity()

  }

  sendFormData(): void {
    this.service.form1$.next(this.firstFormGroup.value)
  }


}
