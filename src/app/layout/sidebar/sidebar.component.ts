import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from '../../services/api-request.service';
import $ from 'jQuery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  url:any = "";
  role:any = 'guest';
  userData:any;
  constructor(private router: Router, private api: ApiRequestService) {
  }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {
      this.userData = this.api.getData(); 
      if(this.userData != undefined && this.userData != null) {
        if(this.userData.role_id == 1) {
          this.role = 'admin';
        }
        else if(this.userData.role_id == 2){
          this.role = 'user';
        }
        else {
          this.role = 'guest';
        }
      }
    });
    this.url = this.router.url;
    $(document).on('click', '.sidebar .nav-item', function() {
      $(".sidebar .nav-item").removeClass("active");
      $(this).addClass("active");
    });
  }
}
