import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FormService } from '../form.service';
import { feedbackData } from '../Data-Types/formdata';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  public firstFormGroup: FormGroup
  public secondFormGroup: any
  public file: any
  public totalFormData: feedbackData
  public fileLength: any;
  public ngForm1: NgForm;
  public ngForm2: NgForm;
  public form1Subscription: Subscription;
  public form2Subscription: Subscription;
  public form3Subscription: Subscription;

  constructor(private matStepper: MatStepper, private service: FormService) { }

  ngOnInit(): void {

    this.form1Subscription = this.service.form1$.subscribe({
      next: (res) => { this.firstFormGroup = res }
    })

    this.form2Subscription = this.service.form2$.subscribe({
      next: (res) => { this.secondFormGroup = res }
    })

    this.form3Subscription = this.service.fileArray$.subscribe({
      next: (res) => { this.fileLength = res.length }
    })

  }

  //** when the edit is clicked - move to first form
  moveToFirstForm(index: NumberInput) {
    this.matStepper.selectedIndex = index

  }

  //** when the edit is clicked - move to Second form
  moveToSecondForm(index: NumberInput) {
    this.matStepper.selectedIndex = index

  }

  confirmAndSubmit(): void {

    this.service.fileArray$.subscribe((res: any) => {
      this.file = res
      console.log("file", this.file);

    })

    this.totalFormData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }

    const formData = new FormData()
    const formObj = this.totalFormData
    console.log(formObj);

    // **Appending obj in FORMDATA
    formData.append('formobjValue', JSON.stringify(formObj))

    this.file.forEach((fileObj: string | Blob) => {
      formData.append('files', fileObj)

    })

    // console.log(formData);

    // **Sending the FORMDATA to service and call POST-request
    this.service.postFormData(formData).subscribe({
      next: (res: any) => {
        console.log("Response from Backend", res)
      }
    })

    setTimeout(() => {
      this.matStepper.reset()
      this.service.fileArray$.next([])
      // ** resetting forms by NgForm directive
      this.service.form1Dir$.subscribe(res => this.ngForm1 = res)
      this.service.form2Dir$.subscribe(res => this.ngForm2 = res)
      this.ngForm1.resetForm()
      this.ngForm2.resetForm()
      localStorage.removeItem("token")

    }, 2000)

  }

  ngOnDestroy(): void {
    this.form1Subscription.unsubscribe()
    this.form2Subscription.unsubscribe()
    this.form3Subscription.unsubscribe()
  }
}
