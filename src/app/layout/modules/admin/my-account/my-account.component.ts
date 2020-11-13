import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  is_active:any = '1';
  userId:any = 0;
  isUserProfile:any = 0;
  userDetails:any = null;
  display_name:any = '';
  transactions:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;

  expertPrice = 0;
  beginnerPrice = 0;
  intermediatePrice = 0;
  expertPrice2 = 0;
  beginnerPrice2 = 0;
  intermediatePrice2 = 0;
  expertPrice3 = 0;
  beginnerPrice3 = 0;
  intermediatePrice3 = 0;
  snafuPrice = 0;
  voterPrice = 0;
  addTopicPrice = 0;
  addVideoPrice = 0;
  videoVotePrice = 0;
  topicVotePrice = 0;
  publicContestPrice = 0;
  privateContestPrice = 0; 
  settingId:any = 0;
  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id != undefined) {
        this.isUserProfile = 1;
        this.userId = id;
      }
      else {
        let data = this.api.getData();
        this.userId = data.id;
        this.getSetting();
      }
    });

    this.getUserInfo();
    this.getTransactions();
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getTransactions();
  }

  getTransactions() {
    this.spinner.show();
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let params = {
      id: this.userId,
      limit: offset + "," + this.itemsPerPage,
    }
    let body = this.adminService.getTransactions(params);
    this.api.post("crud/user_transaction", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.transactions = response.result.data;
        this.totalRecords = response.result.totalrecords;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Transaction Details', 'Failed to Process !');
      }
    });
  }

  getUserInfo() {
    this.spinner.show();
    let body = {"user_id": this.userId}
    this.api.post("user/get-user-details", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.userDetails = response.result;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get User Details', 'Failed to Process !');
      }
    });
  }

  getSetting() {
    this.spinner.show();
    this.api.get("crud/setting").subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let priceDetails = response.result[0];
        this.beginnerPrice = priceDetails.beginner_prize;
        this.beginnerPrice2 = priceDetails.beginner_prize_2;
        this.beginnerPrice3 = priceDetails.beginner_prize_3;
        this.intermediatePrice = priceDetails.intermediate_prize;
        this.intermediatePrice2 = priceDetails.intermediate_prize_2;
        this.intermediatePrice3 = priceDetails.intermediate_prize_3;
        this.expertPrice = priceDetails.expert_prize;
        this.expertPrice2 = priceDetails.expert_prize_2;
        this.expertPrice3 = priceDetails.expert_prize_3;
        this.snafuPrice = priceDetails.snafu_prize;
        this.voterPrice = priceDetails.good_voter_prize;
        this.settingId = priceDetails.id;
        this.addTopicPrice = priceDetails.add_topic_prize;
        this.addVideoPrice = priceDetails.add_video_prize;
        this.videoVotePrice = priceDetails.video_vote_prize;
        this.topicVotePrice = priceDetails.topic_vote_prize;
        this.publicContestPrice = priceDetails.public_side_contest_prize;
        this.privateContestPrice = priceDetails.private_side_contest_prize;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Price Details', 'Failed to Process !');
      }
    });
  }

  updateUserInfo() {
    this.display_name = this.display_name.trim();
    if(this.display_name != "") {
      this.spinner.show();
      let data = {
        name: this.display_name,
        id: this.userId
      }
  
      let body = this.adminService.updateUserInfo(data);
      this.api.put("crud/user_info", body).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.toastr.success('', 'Profile updated successfully!');
          this.spinner.hide();
          this.getUserInfo();
        }
        else {
          this.spinner.hide();
          this.toastr.error('Get User Details', 'Failed to Process !');
        }
      });
    }
  }

  saveSetting() {
    this.spinner.show();
    let data = {
      beginnerPrice: this.beginnerPrice,
      beginnerPrice2: this.beginnerPrice2,
      beginnerPrice3: this.beginnerPrice3,
      intermediatePrice: this.intermediatePrice,
      intermediatePrice2: this.intermediatePrice2,
      intermediatePrice3: this.intermediatePrice3,
      expertPrice:this.expertPrice,
      expertPrice2:this.expertPrice2,
      expertPrice3:this.expertPrice3,
      snafuPrice: this.snafuPrice,
      voterPrice: this.voterPrice,
      addTopicPrice : this.addTopicPrice,
      addVideoPrice: this.addVideoPrice,
      videoVotePrice: this.videoVotePrice,
      topicVotePrice: this.topicVotePrice,
      publicContestPrice: this.publicContestPrice,
      privateContestPrice: this.privateContestPrice,
      id: this.settingId
    }

    let body = this.adminService.saveSetting(data);
    this.api.put("crud/setting", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.toastr.success('', 'Price details saved successfully!');
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get User Details', 'Failed to Process !');
      }
    });
  }
}
