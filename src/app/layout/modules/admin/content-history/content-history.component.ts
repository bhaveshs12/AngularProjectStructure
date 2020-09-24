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
  searchText:any = ""; 
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getContestHistory('vote');
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getContestHistory('vote');
  }

  getContestHistory(sortType) {
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * 2;
    this.spinner.show();
    let params = {
      search: this.searchText,
      limit: offset + ",2",
      type: sortType
    }
    let body = this.adminService.getContestHistory(params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
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
