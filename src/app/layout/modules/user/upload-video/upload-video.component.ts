import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  userData:any;
  videoTitle:any;
  videoLink:any;
  type:any = "";
  contestId:any = null;
  videoPrice:any = 0;

  constructor(private route:ActivatedRoute, private router: Router, private spinner: NgxSpinnerService, private api: ApiRequestService, private userService: UserService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    // this.startDate = {isRange: false, singleDate: {jsDate: new Date()}};
    // this.endDate = {isRange: false, singleDate: {jsDate: new Date()}};

    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.route.params.subscribe(params => {
      this.contestId = params['id'] != undefined && params['id'] != '' ? params['id'] : null;
    });
    this.getSetting();
  }

  getSetting() {
    this.spinner.show();
    this.api.get("crud/setting").subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          // this.private_side_contest_prize = response.result[0].private_side_contest_prize;
          // this.public_side_contest_prize = response.result[0].public_side_contest_prize;
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Setting Details', 'Failed to Process !');
      }
    });
  }

  submit(form) {
    // console.log(this.endDate)
    this.videoTitle = this.videoTitle.trim();
    this.videoLink = this.videoLink.trim();
    if(this.videoTitle != '' && this.videoLink != '') {
      this.spinner.show();
      let params = {
        title: this.videoTitle,
        youtube_url: this.videoLink,
        user_id: this.userData.id,
        type: this.type,
        contest_id: this.contestId
      }
      this.api.post("video/add-video", params).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.spinner.hide();
          this.toastr.success('', 'Video uploaded successfully');
          this.router.navigateByUrl('/user/contestDetails/' + this.contestId)
        }
        else {
          this.spinner.hide();
          this.toastr.error('Add a video', response.message);
        }
      });
    }
  }
}
