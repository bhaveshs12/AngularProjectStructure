import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-good-voters',
  templateUrl: './good-voters.component.html',
  styleUrls: ['./good-voters.component.scss']
})
export class GoodVotersComponent implements OnInit {

  checkBoxes = [{name: '1', value: false}, {name: '2', value: false}, {name: '3', value: false}];
  selectedLength = 0;
  status:any = 0;
  goodVoters:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;
  disableSelectAll:any = true;

  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.getGoodVoterList();
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getGoodVoterList();
  }

  getGoodVoterList() {
    this.spinner.show();
    this.disableSelectAll = true;
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let limit = offset + "," + this.itemsPerPage;
    let body = this.adminService.getGoodVoterList(limit);
    this.api.post("crud/winner", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.goodVoters = response.result.data;
        this.goodVoters.forEach(element => {
          if(element.token_send == 0) {
            this.disableSelectAll = false;
          }
        });
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Good Voters', 'Failed to Process !');
      }
    });
  }

  onChange(state) {
    if(state)
      this.selectedLength++;
    else
      this.selectedLength--;

    if(this.selectedLength === 0)
      this.status = 0;
  }

  selectAll() {
    this.selectedLength = 0;
    this.status = 1;
    this.goodVoters.forEach(element => {
      if(element.token_send == 0) {
        element.value = true;
        this.selectedLength++;
      }
    });
  }

  unSelectAll() {
    this.selectedLength = 0;
    this.status = 0;
    this.goodVoters.forEach(element => {
      element.value = false;
    });
  }

  sendTokens(voter) {
    this.spinner.show();
    let transactionDetails = [];
    if(voter == null) {
      this.goodVoters.forEach(element => {
        if(element.value == true && element.token_send == 0) {
          transactionDetails.push({
            "user_id": element.user_id,
            "tokens": element.tokens,
            "transaction_hash": "",
            "type": "Good_voter",
            "action": "Credit",
            "vote_video_id": element.id
          })
        }
      });
    }
    else {
      transactionDetails.push({
        "user_id": voter.user_id,
        "tokens": voter.tokens,
        "transaction_hash": "",
        "type": "Good_voter",
        "action": "Credit",
        "vote_video_id": voter.id
      })
    }

    let body = {transactionDetails: transactionDetails};
    this.api.post("user/add-transaction", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.toastr.success('', 'Tokens sent successfully!');
        this.spinner.hide();
        this.selectedLength = 0;
        this.status = 0;
        this.getGoodVoterList();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Send Tokens', 'Failed to Process !');
      }
    });
  }
}
