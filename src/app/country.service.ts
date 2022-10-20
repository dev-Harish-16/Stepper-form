import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  public form1$: BehaviorSubject<any> = new BehaviorSubject({})
  public form2$: BehaviorSubject<any> = new BehaviorSubject({})
  public fileArray: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  getCountries() {
    return Country.getAllCountries();
  }

  getStatesByCountry(countryIsoName: string) {
    return State.getStatesOfCountry(countryIsoName);
  }

  getCitiesByState(countryIsoCode: string, stateIsoCode: string) {
    return City.getCitiesOfState(countryIsoCode, stateIsoCode);
  }

  postFormData(formData) {
    return this.http.post("http://localhost:5000/api/feedback", formData)
  }
}
