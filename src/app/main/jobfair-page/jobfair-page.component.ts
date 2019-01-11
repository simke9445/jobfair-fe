import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobfair-page',
  templateUrl: './jobfair-page.component.html',
  styleUrls: ['./jobfair-page.component.css']
})
export class JobfairPageComponent implements OnInit {
  // TODO: add company jobfair application form
  // TODO: show company application details page (if company already applied)
  // - if application is denied - show comment & status
  // - if application is pending - show just status & original details
  // - if application is approved - show approved details & show time slot
  // TODO: add biography upload/company application intervals (set/unset - simple form)
  // TOOD: add application list for admin to approve/disapprove
  // - if approved, pop up a modal for entering the time slot (out of remaining available)

  constructor() {}

  ngOnInit() {}
}
