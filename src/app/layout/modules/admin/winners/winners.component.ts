import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../../../services/api-request.service';
import { AdminService } from '../../../../services/admin-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  selectedLength = 0;
  status:any = 0;
  winners:any = [];
  currentPage:any = 0;
  totalRecords:any = 0;
  itemsPerPage:any = 8;
  disableSelectAll:any = true;
  constructor(private spinner: NgxSpinnerService, private api: ApiRequestService, private adminService: AdminService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.getWinnerList();
  }

  pagignation(ev) {
    this.currentPage = ev;
    this.getWinnerList();
  }

  getWinnerList() {
    this.spinner.show();
    this.disableSelectAll = true;
    let offset = this.currentPage == 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage;
    let limit = offset + "," + this.itemsPerPage;
    let body = this.adminService.getWinnerList(limit);
    this.api.post("crud/winner", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.winners = response.result.data;
        this.winners.forEach(element => {
          if(element.token_Send == 0) {
            this.disableSelectAll = false;
          }
        });
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Get Winners', 'Failed to Process !');
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
    this.winners.forEach(element => {
      element.value = true;
      this.selectedLength++;
    });
  }

  unSelectAll() {
    this.selectedLength = 0;
    this.status = 0;
    this.winners.forEach(element => {
      element.value = false;
    });
  }

  sendTokens(winner) {
    this.spinner.show();
    let transactionDetails = [];
    if(winner == null) {
      this.winners.forEach(element => {
        if(element.value == true && element.token_Send == 0) {
          transactionDetails.push({
            "user_id": element.user_id,
            "tokens": element.tokens,
            "transaction_hash": "",
            "type": element.videoType,
            "action": "Credit",
            "winner_id": element.id
          })
        }
      });
    }
    else {
      transactionDetails.push({
        "user_id": winner.user_id,
        "tokens": winner.tokens,
        "transaction_hash": "",
        "type": winner.videoType,
        "action": "Credit",
        "winner_id": winner.id
      })
    }

    let body = {transactionDetails: transactionDetails};
    this.api.post("user/add-transaction", body).subscribe((response :  any) => {
      if(response.statusCode == 200) {
        this.toastr.success('', 'Tokens sent successfully!');
        this.spinner.hide();
        this.selectedLength = 0;
        this.status = 0;
        this.getWinnerList();
      }
      else {
        this.spinner.hide();
        this.toastr.error('Send Tokens', 'Failed to Process !');
      }
    });
  }
}
