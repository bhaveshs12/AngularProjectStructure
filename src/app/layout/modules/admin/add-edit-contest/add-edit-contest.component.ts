import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-contest',
  templateUrl: './add-edit-contest.component.html',
  styleUrls: ['./add-edit-contest.component.scss']
})
export class AddEditContestComponent implements OnInit {

  contestName:any;
  type:any;
  about:any;
  startDate:any;
  endDate:any;
  priceOne:any;
  priceTwo:any;
  priceThree:any;
  snafuPrice:any;

  constructor() { }

  ngOnInit() {
  }

  submit() {}
}
