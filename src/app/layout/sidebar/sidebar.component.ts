import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jQuery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  url:any = "";
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.url = this.router.url;
    $(".sidebar .nav-item").click(function() {
      $(".sidebar .nav-item").removeClass("active");
      $(this).addClass("active");
    });
  }
}
