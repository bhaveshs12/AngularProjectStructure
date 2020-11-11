import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { UserService } from '../../../../services/user-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  is_active:any = '1';
  userDetails:any = null;
  userData:any = null;
  isUserProfile:any = 0;
  display_name:any = '';

  transactions:any = [];
  votedVideos:any = [];
  contests:any = [];
  settingId:any = 0;

  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 7;
  contestType:any = '';
  amount:any;
  transactionType:any;
  transactionStatus:any = false;
  searchText:any = '';

  constructor(private embedService: EmbedVideoService, private route:ActivatedRoute, private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService, private userService: UserService) { 
  }

  ngOnInit() {
    this.api.userDataChange$.subscribe(val => {this.userData = this.api.getData(); });
    this.getVotedVideoList();
    this.getUserInfo();
  }

  getContests(type) {
    this.contestType = type;
    this.currentPage = 0;
    this.totalRecords = 0;
    this.getContestEntered();
  }

  resetFields(is_active) {
    if(this.is_active != is_active) {
      this.currentPage = 0;
      this.totalRecords = 0;
      this.is_active = is_active;
  
      if(is_active == 1)
        this.getVotedVideoList();
      else if(is_active == 2)
        this.getContestEntered();
      else if(is_active == 3)
        this.getUserInfo();
      else
        this.getTransactions();
    }
  }

  pagignation(ev) {
    this.currentPage = ev;

    if(this.is_active == 1)
      this.getVotedVideoList();
    else if(this.is_active == 2)
      this.getContestEntered();
    else if(this.is_active == 3)
      this.getUserInfo();
    else
      this.getTransactions();
  }

  getVotedVideoList() {
    this.spinner.show();
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let params = {
      id: this.userData.id,
      limit: offset + "," + this.itemsPerPage,
    }
    let body = this.userService.getVotedVideoList(params);
    this.api.post("/crud/video", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        let details = response.result.data;
        if(details.length > 0) {
          details.forEach(element => {
            let id = this.api.getVideoId(element.youtube_url);
            element.url = this.embedService.embed_youtube(id, { attr: { width: "100%", height: "auto" }});
          });
        }
        this.votedVideos = details;
        this.totalRecords = response.result.totalrecords;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Voted Videos', 'Failed to Process !');
      }
    });
  }

  getContestEntered() {
    this.spinner.show();
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let params = {
      id: this.userData.id,
      limit: offset + "," + this.itemsPerPage,
      contestType: this.contestType,
      search: this.searchText
    }
    let body = this.userService.getContestEntered(params);
    this.api.post("/crud/contest", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.contests = response.result.data;
        this.totalRecords = response.result.totalrecords;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Voted Videos', 'Failed to Process !');
      }
    });
  }

  getTransactions() {
    this.spinner.show();
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let params = {
      id: this.userData.id,
      limit: offset + "," + this.itemsPerPage,
    }
    let body = this.adminService.getTransactions(params);
    this.api.post("crud/user_transaction", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.transactions = response.result.data;
        this.totalRecords = response.result.totalrecords;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Transaction Details', 'Failed to Process !');
      }
    });
  }

  getUserInfo() {
    this.spinner.show();
    let body = {"user_id": this.userData.id}
    this.api.post("user/get-user-details", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.userDetails = response.result;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get User Details', 'Failed to Process !');
      }
    });
  }

  updateUserInfo() {
    this.display_name = this.display_name.trim();
    if(this.display_name != "") {
      this.spinner.show();
      let data = {
        name: this.display_name,
        id: this.userData.id
      }
  
      let body = this.adminService.updateUserInfo(data);
      this.api.put("crud/user_info", body).subscribe((response :  any) => {
        if(response.statusCode == 200) {
          this.toastr.success('', 'Profile updated successfully!');
          this.spinner.hide();
          this.getUserInfo();
        }
        else {
          this.spinner.hide();
          this.toastr.error('Get User Details', 'Failed to Process !');
        }
      });
    }
  }

  transactionMsg() {
    if(!this.transactionStatus)
      this.toastr.error('', 'Failed to Process !');
    else
      this.toastr.success('', 'Transaction initiated successfully !');
  }

  withdrawTokens() {
    let obj = this;
    window['ethereum'].enable().then(accounts => {
      const from = accounts[0];
      window['web3'].eth.sendTransaction({
        to: "0xA1b5DF05E2928f37ddb0b90083e69E7a33eB0eE1",
        chainId: 4,
        value: 500000,
        from: from
        }, (err, res) => {
            if(err) {
              obj.transactionStatus = false;
              console.log(err);
            }
            else {
              obj.transactionStatus = true;
              console.log(res)
            }
            document.getElementById("closeModal").click();
          });
      /*
      window['web3'].eth.estimateGas({
        from: from,
        to: "0xA1b5DF05E2928f37ddb0b90083e69E7a33eB0eE1",
      },(function(estimate) {
        console.log(estimate);
        
        window['web3'].eth.sendTransaction({
          to: "0xA1b5DF05E2928f37ddb0b90083e69E7a33eB0eE1",
          chainId: 4,
          value: estimate,
          from: from
          }, (err, res) => {
              if(err) {
                obj.transactionStatus = false;
                console.log(err);
              }
              else {
                obj.transactionStatus = true;
                console.log(res)
              }
              document.getElementById("closeModal").click();
            });
            
          }))
          */
      })
  }

  buyTokens() {
    window['ethereum'].enable().then((accounts) => {
      const from = accounts[0];
      const addressContract = '0xA1b5DF05E2928f37ddb0b90083e69E7a33eB0eE1'; //address contract
      const amount = parseFloat(this.amount) * Math.pow(10, 18);
      const contractInstance = window['web3'].eth.contract(this.api.abi).at(addressContract);
        console.log(contractInstance);
        window['web3']['eth'].sendTransaction(
          {
            // nonce: window['web3'].eth.getTransactionCount(from),
            data: contractInstance.transfer.getData(
              '0x67b6aCdbf847c16799D1e9f1826f4289Fd6e513C',
              window['web3'].toBigNumber(amount)
            ),
            to: '0xA1b5DF05E2928f37ddb0b90083e69E7a33eB0eE1',
            chainId: 4,
            from: from,
            gasPrice: 500000
          },
          (err, res) => {
            if(err) {
              this.transactionStatus = false;
              console.log(err);
            }
            else {
              this.transactionStatus = true;
              console.log(res)
            }
            document.getElementById("closeModal").click();
          }
        );
      })
  }
}
