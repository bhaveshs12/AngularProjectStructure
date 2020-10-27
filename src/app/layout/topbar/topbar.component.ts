import { Component, OnInit } from '@angular/core';
import $ from 'jQuery';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ApiRequestService } from '../../services/api-request.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  status:any = 0;
  uid:any = null;
  constructor(private router: Router, private spinner: NgxSpinnerService, private api: ApiRequestService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    $(document).on('click', '#sidebarToggle', function(e) {  
      e.preventDefault();
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });

    let data = this.api.getData();
    if(data != undefined) {
      this.status = 1;
      this.updatePublicContest(data.id);
    }

    if(window['ethereum'] != undefined) {
      let obj = this;
      window['ethereum'].on('accountsChanged', function (accounts) {
        if(accounts[0] != undefined)
          obj.addUser(accounts[0]);
        else {
          obj.api.removeData();
          window.location.href = window.location.origin + '/admin';
        }
      })
    }
  }

  updatePublicContest(uid) {
    let path = (window.location.pathname).split("/");
    if(path.length > 0 && path[1] == 'public' && path[path.length-1] != uid) {
      
      this.spinner.show();
      let body = {
        contest_id: path[path.length-2],
        user_id: uid
      }
      this.api.post("contest/add-user-to-private-contest", body).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          // this.toastr.error('', 'Failed to Process !');
        }
      });
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
        this.updatePublicContest(response.result.id);
        this.spinner.hide();
        this.api.setData(response.result);
        if(response.result.role_id == 1)
          window.location.href = window.location.origin + '/admin';
        else
          window.location.href = window.location.origin + '/user';
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
        await this.addUser(account[0]);
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
