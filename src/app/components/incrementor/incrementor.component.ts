import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styles: []
})
export class IncrementorComponent implements OnInit {

  @ViewChild('valueProgress', {static: false}) valueProgress: ElementRef;

  @Input() legend: string = 'Legend';
  @Input() progress: number = 50;

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {  }

  ngOnInit() {
  }

  onChanges ( newValue: number ) {
    if( newValue > 100 ) {
      this.progress = 100;
    } else if ( newValue < 0 ) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.valueProgress.nativeElement.value = this.progress;

    this.changeValue.emit(this.progress);
  }

  increase (e) {
    this.valueProgress.nativeElement.focus();
    if ( this.progress < 100 ) {
      this.progress += 5;
      this.changeValue.emit(this.progress);
    } else {
      return;
    }
    
  }

  decrease (e) {
    this.valueProgress.nativeElement.focus();
    if ( this.progress > 0 ) {
      this.progress -= 5;
      this.changeValue.emit(this.progress);
    } else {
      return;
    }
    
  }

}
