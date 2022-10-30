import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '../form.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide: boolean = true;
  hide1: boolean = true;
  minPw = 8;
  signupForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private service: FormService,
    private toast: ToastrService) {
    this._initSignUpForm();

  }

  ngOnInit(): void {


  }

  _initSignUpForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern('^[1-9][0-9\-\(\)\.]{7,32}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
    });
  }

  get username() {
    return this.signupForm.get('username')
  }
  get mobile() {
    return this.signupForm.get('mobile')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.service.signUp(this.signupForm.value).subscribe((res) => {
      console.log("response from backend", res);
      if (res.message == "Error!") {
        this.toast.error("username or email already taken")

      } else {
        this.toast.success("Signup successfull")
        this.router.navigateByUrl("/login")

      }
    })

  }
}
