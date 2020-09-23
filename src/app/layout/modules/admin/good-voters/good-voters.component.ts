import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-good-voters',
  templateUrl: './good-voters.component.html',
  styleUrls: ['./good-voters.component.scss']
})
export class GoodVotersComponent implements OnInit {

  checkBoxes = [{name: '1', value: false}, {name: '2', value: false}, {name: '3', value: false}];
  selectedLength = 0;
  constructor() { }

  ngOnInit() {
  }

  onChange(state) {
    if(state)
      this.selectedLength++;
    else
      this.selectedLength--;
  }

  selectAll() {
    this.selectedLength = 0;
    this.checkBoxes.forEach(element => {
      element.value = true;
      this.selectedLength++;
    });
  }

  unSelectAll() {
    this.selectedLength = 0;
    this.checkBoxes.forEach(element => {
      element.value = false;
    });
  }
}
