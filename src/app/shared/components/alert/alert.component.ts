import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @ViewChild('buttonMessage') buttonMessage!: ElementRef;
  visibleMessage: boolean = false;
  message!: string;

  constructor(private cdr: ChangeDetectorRef) {}
  @Input() type: 'success' | 'error' | 'info' = 'info';

  showMessages(message: string, type: 'success' | 'error' | 'info'){ 
    this.message = message;
    this.type = type;
    this.visibleMessage = true; 

    this.cdr.detectChanges();

    setTimeout(() => {
      if (this.buttonMessage) {
        this.buttonMessage.nativeElement.focus();
      }
    }, 0);

    setTimeout(() => {
      this.closeMessage();
    }, 5000);
  }

  closeMessage() {
    this.visibleMessage = false; 
  }
}
