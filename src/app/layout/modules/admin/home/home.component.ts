import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  ContestData:any = null;
  ExpertVideos:any = [];
  BeginnerVideos:any = [];
  IntermediateVideos:any = [];
  SANFUVideos:any = [];
  UpcomingContests:any = [];

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

  constructor(private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService, private embedService: EmbedVideoService) { 
  }

  ngOnInit() {
    this.getCurrentContest();
  }

  stopLoader() {
    setTimeout(() => {
      this.blockUI.stop();
    }, 1100);
  }

  getExpertVideos(sortType) {
    this.blockUI.start();
    let params = {
      type: 'Expert',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          response.result.forEach(element => {
            element.url = this.embedService.embed(element.youtube_url, { attr:{width: '100%'}});
          });
        }
        this.ExpertVideos = response.result;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Expert Videos', 'Failed to Process !');
      }
    });
  }

  getIntermediateVideos(sortType) {
    this.blockUI.start();
    let params = {
      type: 'Intermediate',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          response.result.forEach(element => {
            element.url = this.embedService.embed(element.youtube_url);
          });
        }
        this.IntermediateVideos = response.result;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Intermediate Videos', 'Failed to Process !');
      }
    });
  }

  getBeginnerVideos(sortType) {
    this.blockUI.start();
    let params = {
      type: 'Beginner',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          response.result.forEach(element => {
            element.url = this.embedService.embed(element.youtube_url);
          });
        }
        this.BeginnerVideos = response.result;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Beginner Videos', 'Failed to Process !');
      }
    });
  }

  getSNAFUVideos(sortType) {
    this.blockUI.start();
    let params = {
      type: 'SNAFU',
      id: this.ContestData.id,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          response.result.forEach(element => {
            element.url = this.embedService.embed(element.youtube_url);
          });
        }
        this.SANFUVideos = response.result;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get SNAFU Videos', 'Failed to Process !');
      }
    });
  }

  getUpcomingContests() {
    this.blockUI.start();
    let body = this.adminService.getUpComingContest();
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.UpcomingContests = response.result;
        this.stopLoader();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Upcoming Contest', 'Failed to Process !');
      }
    });
  }

  getCurrentContest() {
    this.blockUI.start();
    let body = this.adminService.getCurrentContest(null);
    this.api.post("crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.ContestData = response.result.length > 0 ? response.result[0] : null;
        this.stopLoader();
        this.getExpertVideos('vote');
        this.getIntermediateVideos('vote');
        this.getBeginnerVideos('vote');
        this.getSNAFUVideos('vote');
        this.getUpcomingContests();
      }
      else {
        this.stopLoader();
        this.toastr.error('Get Contest Topic of the Week', 'Failed to Process !');
      }
    });
  }
}
