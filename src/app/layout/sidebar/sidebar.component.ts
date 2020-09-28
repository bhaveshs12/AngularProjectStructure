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
  userData:any;
  constructor(private router: Router, private api: ApiRequestService) {
  }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.url = this.router.url;
    $(document).on('click', '.sidebar .nav-item', function() {
      $(".sidebar .nav-item").removeClass("active");
      $(this).addClass("active");
    });
  }
}
