import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form2Component } from './form2/form2.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StepperformComponent } from './stepperform/stepperform.component';


const routes: Routes = [
  
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "stepper", component: StepperformComponent },
  { path: "", component: StepperformComponent, pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
