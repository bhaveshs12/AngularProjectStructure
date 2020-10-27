import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EmbedVideoService } from 'ngx-embed-video';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.scss']
})
export class ContestDetailComponent implements OnInit {

  ContestData:any = null;
  ExpertVideos:any = [];
  BeginnerVideos:any = [];
  IntermediateVideos:any = [];
  SANFUVideos:any = [];
  Winners:any = [];

  sliderOptions = {
    items: 4,
    loop: false,
    dots:false,
    lazyLoad: true,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    nav: true,
    navText:["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0:{
          items:2,
      },
      600:{
          items:2,
          nav:true
      },
      1000: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    },
  }

  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService, private embedService: EmbedVideoService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params)
      let id = params['id'];
      this.getContest(id);
      this.getWinners(id);
    });
  }

  stopLoader() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1100);
  }

  getExpertVideos(sortType) {
    this.spinner.show();
    let params = {
      type: 'Expert',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "auto" }});
          });
        }
        this.ExpertVideos = details;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Expert Videos', 'Failed to Process !');
      }
    });
  }

  getIntermediateVideos(sortType) {
    this.spinner.show();
    let params = {
      type: 'Intermediate',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "auto" }});
          });
        }
        this.IntermediateVideos = details;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Intermediate Videos', 'Failed to Process !');
      }
    });
  }

  getBeginnerVideos(sortType) {
    this.spinner.show();
    let params = {
      type: 'Beginner',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "auto" }});
          });
        }
        this.BeginnerVideos = details;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Beginner Videos', 'Failed to Process !');
      }
    });
  }

  getSNAFUVideos(sortType) {
    this.spinner.show();
    let params = {
      type: 'SNAFU',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "auto" }});
          });
        }
        this.SANFUVideos = details;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get SNAFU Videos', 'Failed to Process !');
      }
    });
  }

  getContest(id) {
    this.spinner.show();
    let body = this.adminService.getContest(id);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.ContestData = response.result.data.length > 0 ? response.result.data[0] : null;
        this.stopLoader();
        this.getExpertVideos('vote');
        if(this.ContestData.type != 'public_side_contest' && this.ContestData.type != 'private_side_contest') {
          this.getIntermediateVideos('vote');
          this.getBeginnerVideos('vote');
        }
        this.getSNAFUVideos('vote');
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Contest Topic of the Week', 'Failed to Process !');
      }
    });
  }

  getWinners(id) {
    this.spinner.show();
    let body = this.adminService.getWinners(id);
    this.api.post("crud/winner", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "auto" }});

            if(element.winnerType == 'Expert')
              element.winnerType = 'First';
            else if(element.winnerType == 'Expert')
              element.winnerType = 'Second';
            else
              element.winnerType = 'Third';
              
          });
        }
        this.Winners = details;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Winners', 'Failed to Process !');
      }
    });
  }

  sendTokens(winner) {
    console.log(winner);
    this.spinner.show();
    let transactionDetails = [];
    transactionDetails.push({
      "user_id": winner.user_id,
      "tokens": 0,
      "transaction_hash": "",
      "type": winner.type,
      "action": "Credit",
      "winner_id": winner.id
    })

    let body = {transactionDetails: transactionDetails};
    this.api.post("user/add-transaction", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.toastr.success('', 'Tokens sent successfully!');
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Send Tokens', 'Failed to Process !');
      }
    });
  }
}
