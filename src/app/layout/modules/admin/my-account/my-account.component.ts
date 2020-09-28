import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  is_active:any = '1';
  userId:any = 0;
  isUserProfile:any = 0;
  userDetails:any = null;
  display_name:any = '';
  transactions:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;

  firstPrice = 0;
  secondPrice = 0;
  thirdPrice = 0;
  snafuPrice = 0;
  voterPrice = 0;

  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id != undefined) {
        this.isUserProfile = 1;
        this.userId = id;
      }
      else {
        let data = this.api.getData();
        this.userId = data.id;
      }
    });

    this.getUserInfo(this.userId);
    this.getTransactions(this.userId);
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getTransactions(this.userId);
  }

  getTransactions(id) {
    this.spinner.show();
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let params = {
      id: id,
      limit: offset + "," + this.itemsPerPage,
    }
    let body = this.adminService.getTransactions(params);
    this.api.post("crud/user_transaction", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.transactions = response.result.data;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Transaction Details', 'Failed to Process !');
      }
    });
  }

  getUserInfo(id) {
    this.spinner.show();
    let body = this.adminService.getUserInfo(id);
    this.api.post("crud/user_info", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.userDetails = response.result.data.length > 0 ? response.result.data[0] : null;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get User Details', 'Failed to Process !');
      }
    });
  }

  saveSetting() {

  }
}
