import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-contests',
  templateUrl: './side-contests.component.html',
  styleUrls: ['./side-contests.component.scss']
})
export class SideContestsComponent implements OnInit {
  currentPublicContest:any = [];
  currentPrivateContest:any = [];
  currentMyPublicContest:any = [];
  currentMyPrivateContest:any = [];
  publicContests:any = [];
  privateContests:any = [];
  myPublicContests:any = [];
  myPrivateContests:any = [];
  userData:any;
  params:any = {};
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.params = {
      user_id: this.userData.id,
      limit: 4,
      searchText: ""
    }
    this.getCurrentPublicContest();
    this.getCurrentPrivateContest();
    this.getCurrentMyPublicContest();
    this.getCurrentMyPrivateContest();
  }

  getCurrentPublicContest() {
    this.spinner.show();
    let body = this.userService.getCurrentPublicContest();
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
          if(response.result.data.length > 0) {
              this.currentPublicContest = response.result.data;
          }
          this.getPublicContests();
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getCurrentPrivateContest() {
    this.spinner.show();
    let body = this.userService.getCurrentPrivateContest(this.params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
          if(response.result.data.length > 0) {
              this.currentPrivateContest = response.result.data;
          }
          this.getPrivateContests();
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getCurrentMyPublicContest() {
    this.spinner.show();
    let body = this.userService.getCurrentMyPublicContest(this.userData.id);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
            this.currentMyPublicContest = response.result.data;
        }
        this.getMyPublicContests();
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getCurrentMyPrivateContest() {
    this.spinner.show();
    let body = this.userService.getCurrentMyPrivateContest(this.params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
            this.currentMyPrivateContest = response.result.data;
        }
        this.getMyPrivateContests();
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getPublicContests() {
    let body = this.userService.getPublicContests(this.params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      this.spinner.hide();
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
            let details = [];
            response.result.data.forEach(element => {
              let index = this.currentPublicContest.findIndex(obj => obj.id == element.id);
              if(index < 0)
                details.push(element)
            });
            this.publicContests = details;
        }
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getPrivateContests() {
    let body = this.userService.getPrivateContests(this.params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      this.spinner.hide();
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
            let details = [];
            response.result.data.forEach(element => {
              let index = this.currentPrivateContest.findIndex(obj => obj.id == element.id);
              if(index < 0)
                details.push(element)
            });
            this.privateContests = details;
        }
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getMyPublicContests() {
    let body = this.userService.getMyPublicContests(this.params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      this.spinner.hide();
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
            let details = [];
            response.result.data.forEach(element => {
              let index = this.currentMyPublicContest.findIndex(obj => obj.id == element.id);
              console.log(index);
              if(index < 0)
                details.push(element)
            });
            this.myPublicContests = details;
        }
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

  getMyPrivateContests() {
    let body = this.userService.getMyPrivateContests(this.params);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      this.spinner.hide();
      if(response.statusCode == 200) {
        if(response.result.data.length > 0) {
            let details = [];
            response.result.data.forEach(element => {
              let index = this.currentMyPrivateContest.findIndex(obj => obj.id == element.id);
              if(index < 0)
                details.push(element)
            });
            this.myPrivateContests = details;
        }
      }
      else {
        this.toastr.error('Get Side Contests', 'Failed to Process !');
      }
    });
  }

}
