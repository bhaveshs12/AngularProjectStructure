import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contest-history',
  templateUrl: './contest-history.component.html',
  styleUrls: ['./contest-history.component.scss']
})
export class ContestHistoryComponent implements OnInit {

  historyData:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;
  searchText:any = "";
  userData:any;
  sortType:any = '';
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.getContestHistory(this.sortType, 0);
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getContestHistory(this.sortType, 1);
  }

  getContestHistory(sortType, resetPage) {
    this.sortType = sortType;
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
