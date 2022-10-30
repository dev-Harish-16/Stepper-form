import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FormService } from '../form.service';
import { feedbackData } from '../Data-Types/formdata';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public firstFormGroup: FormGroup
  public secondFormGroup: any
  public file: any
  public totalFormData: feedbackData
  public fileLength: any;

  constructor(private matStepper: MatStepper, private service: FormService) { }

  ngOnInit(): void {

    this.service.form1$.subscribe({
      next: (res) => { this.firstFormGroup = res }
    })

    this.service.form2$.subscribe({
      next: (res) => { this.secondFormGroup = res }
    })

    this.service.fileArray$.subscribe({
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
      this.matStepper.selectedIndex = 0
      this.matStepper.selected.interacted = false
      this.service.fileArray$.next([])
      // ** resetting the initial values
      this.secondFormGroup.patchValue({
        confirmationNumber: "87879",
        ticket: "9090900",
        flightNumber: 5555,
        flightName: "indigo",
        origin: "chennai",
        destination: "mumbai"
      })
      localStorage.removeItem("token")

    }, 2000)

  }

}
