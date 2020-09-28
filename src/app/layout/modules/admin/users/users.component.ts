import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;
  searchText:any = "";
  userData:any;

  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.getUserList('name', 0);
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getUserList('name', 1);
  }

  getUserList(sortType, resetPage) {
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    this.spinner.show();
    let params = {
      search: this.searchText,
      limit: offset + "," + this.itemsPerPage,
      type: sortType
    }
    let body = this.adminService.getUserList(params);
    this.api.post("crud/user_info", body).subscribe((response :  any) => {
      if(resetPage == 1)
        this.currentPage = 0;
      if(response.statusCode == 200) {
        this.totalRecords = response.result.totalrecords; 
        this.usersList = response.result.data;
        console.log(this.usersList)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get User List', 'Failed to Process !');
      }
    });
  }
}
