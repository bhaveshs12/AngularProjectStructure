import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EmbedVideoService } from 'ngx-embed-video';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vote-video',
  templateUrl: './vote-video.component.html',
  styleUrls: ['./vote-video.component.scss']
})
export class VoteVideoComponent implements OnInit {

  videoDetails:any = null;
  Videos:any = [];
  contestId:any;
  videoId:any;
  userData:any;
  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService, private embedService: EmbedVideoService, private userService: UserService) { 
  }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.route.params.subscribe(params => {
      console.log(params)
      this.contestId = params['contestId'];
      this.videoId = params['videoId'];
      this.getVideoDetails();
    });
  }

  getVideoDetails() {
    this.spinner.show();
    let body = this.userService.getVideoDetails(this.videoId);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.spinner.hide();
        this.videoDetails = response.result.data.length > 0 ? response.result.data[0] : null;
        let id = this.api.getVideoId(this.videoDetails.youtube_url);
        this.videoDetails.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "420px" }});
        this.spinner.hide();
        this.getVideos('vote');
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Expert Videos', 'Failed to Process !');
      }
    });
  }

  getVideos(sortType) {
    this.spinner.show();
    let params = {
      type: this.videoDetails.type,
      id: this.contestId,
      sortType: sortType
    }
    let body = this.adminService.getHomePageVideos(params);
    this.api.post("crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "90px" }});
          });
        }
        this.Videos = details;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Expert Videos', 'Failed to Process !');
      }
    });
  }

  voteVideo(type) {
    this.spinner.show();
    let params = {
      video_id: this.videoId,
      contest_id: this.contestId,
      type: type,
      user_id: this.userData.id
    }
    let body = this.userService.voteVideo(params);
    this.api.post("crud/create", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.spinner.hide();
        if(type == 'up_vote')
          this.toastr.success('', 'You have up voted video successfully');
        else
          this.toastr.success('', 'You have down voted video successfully');
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Expert Videos', 'Failed to Process !');
      }
    });
  }
}
