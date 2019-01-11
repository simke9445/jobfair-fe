import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('drawer') drawer: any;

  constructor() { }

  ngOnInit() {
  }

  onToggleNavigation() {
    this.drawer.toggle();
  }
}
