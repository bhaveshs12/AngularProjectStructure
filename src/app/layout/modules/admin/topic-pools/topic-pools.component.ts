import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic-pools',
  templateUrl: './topic-pools.component.html',
  styleUrls: ['./topic-pools.component.scss']
})
export class TopicPoolsComponent implements OnInit {

  poolsData:any = [];
  ContestData:any = null;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCurrentContest();
  }

  getTopicPools(sortType) {
    this.blockUI.start();
    let params = {
      sortType: sortType
    }
    let body = this.adminService.getTopicPools(params);
    this.api.post("crud/topic", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.poolsData = response.result;
        console.log(this.poolsData);
        this.blockUI.stop();
      }
      else {
        this.blockUI.stop();
        this.toastr.error('Get Topic Pools', 'Failed to Process !');
      }
    });
  }

  getCurrentContest() {
    this.blockUI.start();
    let body = this.adminService.getCurrentContest(null);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.blockUI.stop();
        this.ContestData = response.result.length > 0 ? response.result[0] : null;
        this.getTopicPools('vote');
      }
      else {
        this.blockUI.stop();
        this.toastr.error('Get Contest Topic of the Week', 'Failed to Process !');
      }
    });
  }
}
