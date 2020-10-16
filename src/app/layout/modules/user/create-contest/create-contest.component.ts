import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss']
})
export class CreateContestComponent implements OnInit {

  public mytime: Date = new Date();
  currentYear: any = this.mytime.getUTCFullYear();
  currentDate: any = this.mytime.getUTCDate();
  currentMonth: any = this.mytime.getUTCMonth();
  public min = new Date(this.currentYear, this.currentMonth, this.currentDate, 0, 0);

  startDate: any;
  endDate: any;
  pageType:any = 1;
  contestName:any;
  type:any = "";
  about:any;
  priceOne:any;
  priceTwo:any;
  priceThree:any;
  userData:any;
  private_side_contest_prize:any = 0;
  public_side_contest_prize:any = 0;

  constructor(private route:ActivatedRoute, private router: Router, private spinner: NgxSpinnerService, private api: ApiRequestService, private userService: UserService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    // this.startDate = {isRange: false, singleDate: {jsDate: new Date()}};
    // this.endDate = {isRange: false, singleDate: {jsDate: new Date()}};

    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.route.params.subscribe(params => {
      this.pageType = params['type'] != undefined && params['type'] != '' ? params['type'] : 1;
    });
    this.getSetting();
  }

  getSetting() {
    this.spinner.show();
    this.api.get("crud/setting").subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          this.private_side_contest_prize = response.result[0].private_side_contest_prize;
          this.public_side_contest_prize = response.result[0].public_side_contest_prize;
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Setting Details', 'Failed to Process !');
      }
    });
  }

  change() {
    let date = moment(this.startDate).utc().format("YYYY-MM-DD HH:mm:ss");
    console.log(date)
  }

  submit(form) {
    // console.log(this.endDate)
    this.contestName = this.contestName.trim();
    this.about = this.about.trim();
    if(this.contestName != '' && this.about != '') {
      this.spinner.show();
      let params = {
        name: this.contestName,
        description: this.about,
        user_id: this.userData.id,
        type: this.type,
        start_date_time: moment(this.startDate).utc().format("YYYY-MM-DD HH:mm:ss"),
        end_date_time: moment(this.endDate).utc().format("YYYY-MM-DD HH:mm:ss"),
        beginner_prize: this.priceOne,
        intermediate_prize: this.priceTwo,
        expert_prize: this.priceThree
      }
      this.api.post("contest/add-contest", params).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.spinner.hide();
          this.toastr.success('', 'Contest added successfully');
          this.router.navigateByUrl('/user/contests')
        }
        else {
          this.spinner.hide();
          this.toastr.error('Add a contest', response.message);
        }
      });
    }
  }
}