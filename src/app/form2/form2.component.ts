import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('ngForm2') form2GroupDirective: NgForm
  @ViewChild('fileref') fileref: ElementRef
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
  public form1Subscription: Subscription;
  public fileType: string[] = ['']
  constructor(
    private formBuilder: FormBuilder,
    private service: FormService,
    private toastr: ToastrService) {
    this.secondForm()

  }

  secondForm(): void {
    this.secondFormGroup = this.formBuilder.group({
      confirmationNumber: ['', [Validators.required]],
      ticket: ['', [Validators.required]],
      dateOfFlight: [''],
      flightNumber: [''],
      flightName: [''],
      origin: [''],
      destination: [''],
      textArea: ['', [Validators.maxLength(1500), Validators.required]],
      reply: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    this.form1Subscription = this.service.form1$.subscribe((res) => this.fullname = res)
    this.service.fileArray$.subscribe((res) => {
      this.fileArray = res
    })
    console.log(this.fileArray);

  }

  ngAfterViewInit() {

    const filetypeArray = this.fileref.nativeElement.accept.split(',');
    console.log(filetypeArray);
    this.fileType = filetypeArray.map(element => element.replace(/\./g, "").trim())
    console.log(this.fileType);
    
  }


  disableOption(event: { checked: boolean }): void {
    // **assigning boolean value 
    this.isDisable = event.checked
    this.service.checkBoxEvent$.next(this.isDisable)
    console.log(this.isDisable);

    // **To Disable and Enable Formcontrol
    if (event.checked === true) {
      for (const key of Object.keys(this.secondFormGroup.controls)) {
        if (key == "confirmationNumber" || key == "ticket") {
          console.log(key);
          this.secondFormGroup.controls[key].reset()
          this.secondFormGroup.controls[key].disable()
          // this.secondFormGroup.controls[key].clearValidators()
          // this.secondFormGroup.controls[key].updateValueAndValidity()
        }
        else {
          if (key == "textArea") {
            this.secondFormGroup.controls[key].setValidators([Validators.required, Validators.maxLength(1500)])
            this.secondFormGroup.controls[key].updateValueAndValidity()
          } else {
            if (key !== "reply") {
              this.secondFormGroup.controls[key].reset()
              this.secondFormGroup.controls[key].setValidators([Validators.required, Validators.maxLength(1500)])
              this.secondFormGroup.controls[key].updateValueAndValidity()
            }
          }
        }
      }
      // this.secondFormGroup.controls['confirmationNumber'].reset()
      // this.secondFormGroup.controls['confirmationNumber'].disable()
      // this.secondFormGroup.controls['ticket'].disable()
      // this.secondFormGroup.controls['ticket'].reset()
      // this.secondFormGroup.controls['confirmationNumber'].clearValidators()
      // this.secondFormGroup.controls['confirmationNumber'].updateValueAndValidity()
      // this.secondFormGroup.controls['ticket'].clearValidators()
      // this.secondFormGroup.controls['ticket'].updateValueAndValidity()

      // add validation-if checkbox is checked

      // this.secondFormGroup.controls['flightNumber'].setValidators([Validators.required])
      // this.secondFormGroup.controls['flightNumber'].updateValueAndValidity()
      // this.secondFormGroup.controls['flightName'].setValidators([Validators.required])
      // this.secondFormGroup.controls['flightName'].updateValueAndValidity()
      // this.secondFormGroup.controls['origin'].setValidators([Validators.required])
      // this.secondFormGroup.controls['origin'].updateValueAndValidity()
      // this.secondFormGroup.controls['destination'].setValidators([Validators.required])
      // this.secondFormGroup.controls['destination'].updateValueAndValidity()
    }
    if (event.checked === false) {
      for (const key of Object.keys(this.secondFormGroup.controls)) {
        if (key == "confirmationNumber" || key == "ticket") {
          this.secondFormGroup.controls[key].reset()
          this.secondFormGroup.controls[key].enable()
          // this.secondFormGroup.controls[key].setValidators([Validators.required])
          // this.secondFormGroup.controls[key].updateValueAndValidity()
        }
        else {
          if (key == "textArea") {
            console.log(key);
            this.secondFormGroup.controls[key].setValidators([Validators.required, Validators.maxLength(1500)])
            this.secondFormGroup.controls[key].updateValueAndValidity()
          }
          else {
            if (key !== "reply") {
              this.secondFormGroup.controls[key].reset()
              this.secondFormGroup.controls[key].clearValidators()
              this.secondFormGroup.controls[key].updateValueAndValidity()
            }

          }

        }
      }

      // this.secondFormGroup.controls['confirmationNumber'].enable()
      // this.secondFormGroup.controls['ticket'].enable()
      // this.secondFormGroup.controls['confirmationNumber'].setValidators([Validators.required])
      // this.secondFormGroup.controls['confirmationNumber'].updateValueAndValidity()
      // this.secondFormGroup.controls['ticket'].setValidators([Validators.required])
      // this.secondFormGroup.controls['ticket'].updateValueAndValidity()

      //remove validations - if checkbox is not checked
      // this.secondFormGroup.controls['flightNumber'].clearValidators()
      // this.secondFormGroup.controls['flightNumber'].updateValueAndValidity()
      // this.secondFormGroup.controls['flightName'].clearValidators()
      // this.secondFormGroup.controls['flightName'].updateValueAndValidity()
      // this.secondFormGroup.controls['origin'].clearValidators()
      // this.secondFormGroup.controls['origin'].updateValueAndValidity()
      // this.secondFormGroup.controls['destination'].clearValidators()
      // this.secondFormGroup.controls['destination'].updateValueAndValidity()
    }

  }

  file(event: any): void {
    const files = event.target.files
    // console.log(files);
    const type: string = files[0].name.split(".").pop()
    if (this.fileType.includes(type)) { //check the file-type is present in the array or not
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
        // **Calculating file size
        // console.log(files[0].size);
        this.individualFile = files[0].size
        this.fileSize += files[0].size
        // console.log("total size",this.fileSize);
        // ** Checking File Size
        if (this.fileSize >= 25000000) {
          // ** if fileSize is not matched ,remove file and subtract the length and size value 
          this.fileArray.pop()
          this.fileSize -= this.individualFile
          this.fileLength -= this.length
          console.log("file poped", this.fileArray);
          this.toastr.warning("file size exceeded")
        }
        else {
          this.toastr.success("Upload successfull ")

        }

      }
      else {
        this.toastr.warning("Maximum file upload reached")

      }
    }
    else {
      this.toastr.warning("kindly upload files in given format")
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

  ngOnDestroy(): void {
    this.form1Subscription.unsubscribe()
  }
}
