import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public firstFormGroup: any
  public secondFormGroup: any
  public file
  totalFormData: any
  constructor(private matStepper: MatStepper, private service: CountryService) { }

  ngOnInit(): void {

    this.service.form1$.subscribe({
      next: (res) => { this.firstFormGroup = res }
    })
    this.service.form2$.subscribe({
      next: (res) => { this.secondFormGroup = res }
    })

  }

  moveToFirstForm(index: NumberInput) {
    this.matStepper.selectedIndex = index

  }
  moveToSecondForm(index: NumberInput) {
    this.matStepper.selectedIndex = index

  }

  finalData(): void {

    this.service.fileArray.subscribe((res) => {
      this.file = res
      console.log(this.file);

    })

    this.totalFormData = {
      ...this.firstFormGroup,
      ...this.secondFormGroup
    }

    
    const formData = new FormData()
    const formObj = this.totalFormData.value
    // **Appending obj in FORMDATA
    formData.append('formData', JSON.stringify(formObj))
    this.file.forEach((fileObj: string | Blob) => {
      console.log("line 56", fileObj);
      formData.append('files', fileObj)
    })
    console.log(this.totalFormData);
    // console.log(formData);
    // **Sending the FORMDATA to service and call POST-request
    this.service.postFormData(formData).subscribe({
      next: (res) => {
        console.log("Response from Backend",res)
      }
    })

    // setTimeout(() => {
    //   this.matStepper.reset()
    //   this.matStepper.selectedIndex = 0;
    //   this.matStepper.selected.interacted = false

    // }, 3000)
  }

}
