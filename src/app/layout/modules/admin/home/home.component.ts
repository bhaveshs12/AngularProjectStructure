import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images:any = ["assets/images/default/img1.jpg", "assets/images/default/img2.jpg", "assets/images/default/img3.jpg", "assets/images/default/img1.jpg", "assets/images/default/img2.jpg"]
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

  constructor() { }

  ngOnInit() {
  }

}
