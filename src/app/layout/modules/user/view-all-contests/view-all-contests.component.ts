import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-all-contests',
  templateUrl: './view-all-contests.component.html',
  styleUrls: ['./view-all-contests.component.scss']
})
export class ViewAllContestsComponent implements OnInit {

  type:any = 0;
  contests:any = [];
  userData:any = null;
  searchText:any = "";
  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService, private api: ApiRequestService, private userService: UserService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.route.params.subscribe(params => {
      // console.log(params)
      this.type = params['type'] != undefined && params['type'] != '' ? params['type'] : 0;
      this.getContests();
      
    });
  }

  getContests() {
    this.spinner.show();
    let body = null;
    let params = {
      user_id: this.userData.id,
      limit: '',
      searchText: this.searchText
    }
    if(this.type == 1) {
      body = this.userService.getMyPublicContests(params);
    }
    else if(this.type == 2) {
      body = this.userService.getMyPrivateContests(params);
    }
    else
      body = this.userService.getPublicContests(params);

    this.api.post("crud/contest", body).subscribe((response :  any) => {
      this.spinner.hide();
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
          this.contests = response.result.data;
        }
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }
}
