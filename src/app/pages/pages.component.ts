import { Component, OnInit } from '@angular/core';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})


export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    customInitFunctions();
  }

}
