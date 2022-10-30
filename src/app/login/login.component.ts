import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '../form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true

  constructor(private router: Router, private service: FormService, private toast: ToastrService) { }

  ngOnInit(): void {

  }

  onLogin(form: NgForm) {
    console.log(form.value);
    this.service.login(form.value).subscribe((res) => {
      console.log("Response From Backend", res);
      const token = res.payload
      localStorage.setItem("token", token)
      if (res.payload) {
        this.toast.success("Login Successfull")
        this.router.navigateByUrl("/stepper")
      } else {
        this.toast.error("Login unsuccessfull.!!")

      }

    })


  }

}
