import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.scss']
})
export class HowtoComponent implements OnInit {
  url:any = '';
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService, private embedService: EmbedVideoService) { 
  }

  ngOnInit() {
    this.getSetting();
  }

  getSetting() {
    this.spinner.show();
    this.api.get("crud/setting").subscribe((response :  any) => {
      if(response.statusCode == 200) {
        if(response.result.length > 0) {
          let id = this.api.getVideoId(response.result[0].howToUrl);
          this.url = this.embedService.embed_youtube(id, { attr: { width: "80%", height: "450px" }});
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Setting Details', 'Failed to Process !');
      }
    });
  }
}
