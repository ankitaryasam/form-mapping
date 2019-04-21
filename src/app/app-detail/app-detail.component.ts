import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent implements OnInit, AfterViewInit {
  @Input() user: any;
  users: any;
  applications: any;
  formGroup: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      applications: this.fb.array([])
    });
    this.getApps();
  }

  get AppCtrl(): FormArray {
    return this.formGroup.get('applications') as FormArray;
  }

  ngAfterViewInit() {
  }



  getApps() {
    this.http.get('http://localhost:3000/applications').subscribe(apps => {
      this.applications = apps;
      this.addApps();
    });
  }

  buildApps(app?: any) {
    if (app) {
      return this.fb.group({
        name: [app.name],
        role: [app.groups[0]],
        status: [false]
      });
    } else {
      return this.fb.group({
        name: [''],
        role: [''],
        status: [true]
      });
    }
  }

  addApps() {
    this.applications.forEach(element => {
      this.AppCtrl.push(this.buildApps(element));
    });
    console.log(this.applications);

    this.formGroup.patchValue(this.user);
  }

  formSubmit() {
    let arr = this.formGroup.getRawValue();
    console.log(this.formGroup.getRawValue());
    let filteredArr = arr.applications.filter(el => el.status === true);
    // console.log(filteredArr);
    arr.applications = filteredArr;
    console.log(arr);
  }

}
