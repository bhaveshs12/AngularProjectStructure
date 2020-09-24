import { Component, OnInit } from '@angular/core';
import $ from 'jQuery';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiRequestService } from '../../services/api-request.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  status:any = 0;
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private toastr: ToastrService) { 
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

  async addUser(address) {
    this.spinner.show();
    let params = {
      eth_address: address
    }
    this.api.post("user/add-user", params).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        window['web3']['eth']['defaultAccount'] = address;
        this.status = 1;
        this.toastr.success("Your wallet connected successfully!", 'Connect Your Wallet');
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Add User', 'Failed to Process !');
      }
    });
  }

  async connectWallet() {
    if(window['ethereum'] != undefined) {
      try {
        const account = await window['ethereum'].enable();
        console.log(account); // account's will be in array
        this.addUser(account[0]);
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
