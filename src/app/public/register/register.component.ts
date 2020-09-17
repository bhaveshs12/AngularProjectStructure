import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import {ApiRequestService} from '../../services/api-request.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  list:any = [];
  constructor(private toastr: ToastrService, private api: ApiRequestService) { }
  
  ngOnInit() {
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.blockUI.start();
    this.api.get("all").subscribe((data) => {
      this.blockUI.stop();
      this.list = data;
    },
    (error) => {
      this.blockUI.stop();
      this.toastr.error('Hello world!', 'Toastr fun!');
    });
  }

}
