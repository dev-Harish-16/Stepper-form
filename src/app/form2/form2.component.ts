import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  public secondFormGroup: FormGroup;
  public isDisable: boolean = false
  public fileArray: any = []
  public fileLength: number = 0
  public fileSize: number = 0
  public fileUrl: any;
  public finalfileArray: any = []
  public individualFile: any;
  public length: any;
  public fullname: any;



  constructor(private formBuilder: FormBuilder, private service: FormService, private matStepper: MatStepper, private router: Router) {
    this.secondForm()

  }

  secondForm(): void {
    this.secondFormGroup = this.formBuilder.group({
      confirmationNumber: [87879],
      ticket: [12342414],
      dateOfFlight: [Date.now()],
      flightNumber: [2312414],
      flightName: ['indigo'],
      origin: ['chennai'],
      destination: ['mumbai'],
      textArea: ['', [Validators.maxLength(1500), Validators.required]],
      reply: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {

    this.service.form1$.subscribe((res) => this.fullname = res)

    this.service.fileArray$.subscribe((res) => {
      this.fileArray = res
    })

    console.log(this.fileArray);

    // this.service.isBooleanValue.subscribe((res) => {
    //   this.fileArrayBoolean = res
    // })
    // // this.fileArrayBoolean == false ? this.fileArray : this.fileArray = []
    // if (this.fileArrayBoolean == false) {
    //   return this.fileArray
    // } else {
    //   this.fileArray = []
    // }
    // console.log(this.fileArrayBoolean);

  }

  disableOption(event: { checked: boolean }): void {
    // **assigning boolean value 
    this.isDisable = event.checked

    // **To Disable and Enable Formcontrol
    if (event.checked === true) {
      this.secondFormGroup.controls['confirmationNumber'].disable()
      this.secondFormGroup.controls['ticket'].disable()
    }
    else {
      this.secondFormGroup.controls['confirmationNumber'].enable()
      this.secondFormGroup.controls['ticket'].enable()
    }

  }

  file(event: any): void {

    const files = event.target.files
    console.log(files);
    // **Calculating File Length
    this.length = files.length
    this.fileLength += files.length

    //** Checking the File length <= 5
    if (this.fileLength <= 5) {
      // console.log(event.target.files[0]);
      // console.log(typeof event.target.files[0]);
      // ** pushing files(Blob) into FileArray
      if (files.length > 0) {
        this.fileArray.push(files[0])
      }
      console.log(this.fileLength);
      console.log(this.fileArray);

      // **Calculating file size
      // console.log(files[0].size);
      this.individualFile = files[0].size
      this.fileSize += files[0].size

      // console.log("total size",this.fileSize);
      // ** Checking File Size
      if (this.fileSize >= 25000000) {
        // ** if fileSize is not matched ,
        //**  remove file and subtract the length and size value 
        this.fileArray.pop()
        this.fileSize -= this.individualFile
        this.fileLength -= this.length
        console.log("file poped", this.fileArray);
        alert("file size exceeded")
      }
      else {
        alert("upload successfull")
      }

    }
    else {
      alert("Please Select 5 files or low")

    }

  }

  // ** file remove based on index
  removeFile(index: any) {
    console.log(index);
    this.fileArray.splice(index, 1)
    this.fileSize -= this.individualFile
    this.fileLength -= this.length
    console.log("file removed");


  }

  sendData(): void {
    this.service.form2$.next(this.secondFormGroup)
    this.service.fileArray$.next(this.fileArray)
    console.log(this.fileArray);


  }

}
