import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progressOne: number = 0;
  progressTwo: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
