import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-field',
  templateUrl: './label-field.component.html',
  styleUrls: ['./label-field.component.css']
})
export class LabelFieldComponent implements OnInit {
  @Input('value') value: string;
  @Input('label') label: string;

  constructor() { }

  ngOnInit() {
  }

}
