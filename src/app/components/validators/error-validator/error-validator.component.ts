import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-validator',
  templateUrl: './error-validator.component.html',
  styleUrls: ['./error-validator.component.css']
})
export class ErrorValidatorComponent implements OnInit {
  @Input() validationArray;
  @Input() formDetails;
  @Input() elementType;
  constructor() { }

  ngOnInit() {
  }

}
