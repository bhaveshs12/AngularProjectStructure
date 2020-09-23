import { Component, OnInit } from '@angular/core';
import $ from 'jQuery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  status:any = 0;
  constructor(private toastr: ToastrService) { 
  }

  ngOnInit() {
    $(document).on('click', '#sidebarToggle', function(e) {  
      e.preventDefault();
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });

    if(window['web3'] != undefined && window['web3']['eth'] != undefined) {
      if(window['web3']['eth']['defaultAccount'] != null && window['web3']['eth']['defaultAccount'].length > 0) {
        this.status = 1;
      }
    }
  }

  async connectWallet() {
    if(window['ethereum'] != undefined) {
      try {
        const account = await window['ethereum'].enable();
        console.log(account); // account's will be in array
        window['web3']['eth']['defaultAccount'] = account[0];
        this.status = 1;
      }
      catch(err) {
        this.toastr.warning(err.message, 'Connect Your Wallet');
      }
    }
    else {
      this.toastr.warning('Please Install metamask extensions on your browser to connect your wallet!', 'Connect Your Wallet');
    }
  }
}
