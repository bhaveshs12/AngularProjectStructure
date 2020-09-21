import { Component, OnInit } from '@angular/core';
import $ from 'jQuery';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).on('click', '#sidebarToggle', function(e) {  
      e.preventDefault();
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });
  }

}
