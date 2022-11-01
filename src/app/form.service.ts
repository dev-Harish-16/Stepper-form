import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country, State, City } from 'country-state-city'
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  public form1$: BehaviorSubject<any> = new BehaviorSubject({})
  public form2$: BehaviorSubject<any> = new BehaviorSubject({})
  public fileArray$: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  getCountries() {
    return Country.getAllCountries();
  }

  getStatesByCountry(countryIsoCode: string) {
    return State.getStatesOfCountry(countryIsoCode);
  }

  getCitiesByState(countryIsoCode: string, stateIsoCode: string) {
    return City.getCitiesOfState(countryIsoCode, stateIsoCode);
  }

  postFormData(formData: FormData) {
    return this.http.post("http://localhost:5000/feedback/comments", formData)

  }

  signUp(userData: NgForm) {
    return this.http.post<any>("http://localhost:5000/user/signup", userData)

  }
  login(userData: NgForm) {
    return this.http.post<any>("http://localhost:5000/user/login", userData)
  }

}
