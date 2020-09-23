import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

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
