import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-date-picker-popup',
  templateUrl: './date-picker-popup.component.html',
  styleUrls: ['./date-picker-popup.component.scss']
  ,
  // encapsulation: ViewEncapsulation.None,
})

export class DatePickerPopupComponent implements OnInit {

  isCorrect: boolean;

  @Input() dateDescriptionFrom: string;
  @Input() dateDescriptionTo: string;

  @Output() selectedDateFromEmitter = new EventEmitter<Date>();
  @Output() selectedDateToEmitter = new EventEmitter<Date>();

  selectedDateFrom: Date;
  selectedDateTo: Date;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.isCorrect = true;
    this.selectedDateFrom = null;
    this.selectedDateTo = null;
  }

  addEventFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event == null || event.value == null) {
      return;
    }
    //TODO check if values are inbetween
    if (this.selectedDateTo !== null && event.value > this.selectedDateTo) {
      this.isCorrect = false;
      return;
    }
    this.isCorrect = true;

    this.selectedDateFrom = event.value;
    this.selectedDateFromEmitter.emit(event.value);
  }

  addEventTo(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event == null || event.value == null) {
      return;
    }
    //TODO check if values are inbetween
    if (this.selectedDateFrom !== null && event.value < this.selectedDateFrom) {
      this.isCorrect = false;
      return;
    }
    this.isCorrect = true;

    this.selectedDateTo = event.value;
    this.selectedDateToEmitter.emit(event.value);
  }
}

