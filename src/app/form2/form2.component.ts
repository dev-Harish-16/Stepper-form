import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  @ViewChild('ngForm2') form2GroupDirective: NgForm
  public secondFormGroup: FormGroup;
  public isDisable: boolean
  public fileArray: any = []
  public fileLength: number = 0
  public fileSize: number = 0
  public fileUrl: any;
  public finalfileArray: any = []
  public individualFile: any;
  public length: any;
  public fullname: any;
  public subscription: Subscription
  public isFileCheck: boolean

  constructor(private formBuilder: FormBuilder, private service: FormService, private matStepper: MatStepper, private router: Router) {
    this.secondForm()

  }

  secondForm(): void {
    this.secondFormGroup = this.formBuilder.group({
      confirmationNumber: [87879],
      ticket: [12342414],
      dateOfFlight: [''],
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
    const fileType = ["jpg", "jpeg", "png", "pdf", "docx", "doc", "xls", "xlsx", "ppt", "pptx", "csv"]
    const files = event.target.files
    // console.log(files);
    this.isFileCheck!=false
    fileType.forEach((fileExtension) => {
      const type = files[0].name.split(".")[1]
      // console.log(type);
      if (fileExtension == type) {
        this.isFileCheck = true
      }
    })
    // **if true - perform logic
    if (this.isFileCheck === true) {
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
    else {
      alert("please select the file in given format")
    }

  }

  // ** file remove based on index
  removeFile(fileObj, index: any) {
    console.log(fileObj);
    console.log(index);
    this.fileArray.splice(index, 1)
    this.fileSize -= fileObj.size
    this.fileLength -= this.length
    console.log("file removed");


  }

  sendData(): void {
    this.service.form2$.next(this.secondFormGroup)
    this.service.fileArray$.next(this.fileArray)
    this.service.form2Dir$.next(this.form2GroupDirective)
    console.log(this.fileArray);


  }

}
