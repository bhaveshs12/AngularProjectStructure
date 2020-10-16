import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from '../../../../services/api-request.service';
@Component({
  selector: 'app-suggest-topic',
  templateUrl: './suggest-topic.component.html',
  styleUrls: ['./suggest-topic.component.scss']
})
export class SuggestTopicComponent implements OnInit {

  about:any;
  contestName:any;
  userData:any;
  tokens:any = null;
  constructor(private spinner: NgxSpinnerService, private userService: UserService, private toastr: ToastrService, private api: ApiRequestService) { }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.getSetting();
  }

  getSetting() {
    this.spinner.show();
    this.api.get("crud/setting").subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          let priceDetails = response.result[0];
          this.tokens = priceDetails.add_topic_prize
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Price Details', 'Failed to Process !');
      }
    });
  }

  submit(form) {
    this.contestName = this.contestName.trim();
    this.about = this.about.trim();
    if(this.contestName != '' && this.about != '') {
      this.spinner.show();
      let params = {
        name: this.contestName,
        description: this.about,
        user_id: this.userData.id
      }
      this.api.post("topic/add-topic", params).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.spinner.hide();
          this.toastr.success('', 'Topic suggested successfully');
          this.about = undefined;
          this.contestName = undefined;
          form.resetForm();
        }
        else {
          this.spinner.hide();
          this.toastr.error('Suggest a topic', response.message);
        }
      });
    }
  }
}
