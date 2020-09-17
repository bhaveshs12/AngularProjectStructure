import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  firstName:any;
  lastName:any;
  comment:any;

  constructor() { }

  ngOnInit() {
  }

  submit() {
    alert(this.firstName);
    alert(this.lastName);
    alert(this.comment);
  }
}
