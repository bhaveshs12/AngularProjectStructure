import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topics-pool',
  templateUrl: './topics-pool.component.html',
  styleUrls: ['./topics-pool.component.scss']
})
export class TopicsPoolComponent implements OnInit {

  poolsData:any = [];
  ContestData:any = null;
  userData:any;
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 7;
  sortType:any = 'vote';
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.getCurrentContest();
  }

  getTopicPools(sortType, resetPage) {
    this.sortType = sortType;
    if(resetPage == 0)
      this.currentPage = 0;

    this.spinner.show();
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let params = {
      sortType: sortType,
      limit: offset + "," + this.itemsPerPage,
    }
      let body = this.adminService.getTopicPools(params);
      this.api.post("crud/topic", body).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.poolsData = response.result.data;
          this.totalRecords = response.result.totalrecords;
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this.toastr.error('Get Topic Pools', 'Failed to Process !');
        }
    });
  }
  
  pagignation(ev) {
    this.currentPage = ev;
    this.getTopicPools(this.sortType, 1);
  }

  getCurrentContest() {
    this.spinner.show();
    let body = this.adminService.getCurrentContest(null);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.spinner.hide();
        this.ContestData = response.result.data.length > 0 ? response.result.data[0] : null;
        this.getTopicPools(this.sortType, 1);
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Contest Topic of the Week', 'Failed to Process !');
      }
    });
  }

  voteTopic(id, type) {
    this.spinner.show();
    let params = {
      "topic_id": id.toString(),
      "type": type,
      "user_id": this.userData.id,
    }
    this.api.post("topic/topic-vote", params).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.spinner.hide();
        this.getTopicPools(this.sortType, 1);
        if(type == 'up_vote')
          this.toastr.success('', 'You have up voted topic successfully');
        else
          this.toastr.success('', 'You have down voted topic successfully');
      }
      else {
        this.spinner.hide();
        this.toastr.error('Vote to Topic', 'Failed to Process !');
      }
    });
  }
}
