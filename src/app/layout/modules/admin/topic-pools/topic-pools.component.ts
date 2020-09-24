import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic-pools',
  templateUrl: './topic-pools.component.html',
  styleUrls: ['./topic-pools.component.scss']
})
export class TopicPoolsComponent implements OnInit {

  poolsData:any = [];
  ContestData:any = null;
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCurrentContest();
  }

  getTopicPools(sortType) {
    this.spinner.show();
    let params = {
      sortType: sortType
    }
    let body = this.adminService.getTopicPools(params);
    this.api.post("crud/topic", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.poolsData = response.result.data;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Topic Pools', 'Failed to Process !');
      }
    });
  }

  getCurrentContest() {
    this.spinner.show();
    let body = this.adminService.getCurrentContest(null);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.spinner.hide();
        this.ContestData = response.result.data.length > 0 ? response.result.data[0] : null;
        this.getTopicPools('vote');
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Contest Topic of the Week', 'Failed to Process !');
      }
    });
  }
}
