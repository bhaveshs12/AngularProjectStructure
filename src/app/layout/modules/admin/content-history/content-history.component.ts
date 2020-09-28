import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-content-history',
  templateUrl: './content-history.component.html',
  styleUrls: ['./content-history.component.scss']
})
export class ContentHistoryComponent implements OnInit {

  historyData:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;
  searchText:any = "";
  userData:any;

  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.getContestHistory('main', 0);
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getContestHistory('main', 1);
  }

  getContestHistory(sortType, resetPage) {
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    this.spinner.show();
    let params = {
      search: this.searchText,
      limit: offset + "," + this.itemsPerPage,
      type: sortType
    }
    let body = this.adminService.getContestHistory(params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(resetPage == 0)
        this.currentPage = 0;
      if(response.statusCode == 200) {
        this.totalRecords = response.result.totalrecords; 
        this.historyData = response.result.data;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Topic Pools', 'Failed to Process !');
      }
    });
  }
}
