import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  template: `
  <div *ngIf="newKeg">
    <label>Enter Keg Brand:</label>
    <input [(ngModel)]="newKeg.brand" type='text' class='form-control'><br>
    <label>Enter Keg Name:</label>
    <input [(ngModel)]="newKeg.name" type='text' class='form-control'><br>
    <label>Enter Price Per Pint:</label>
    <input [(ngModel)]="newKeg.price" type='number' class='form-control'><br>
    <label>Enter Alcohol Content:</label>
    <input [(ngModel)]="newKeg.alcoholC" type='text' class='form-control'><br>
    <label>Enter Beer Style:</label>
    <input [(ngModel)]="newKeg.style" type='text' class='form-control'><br>
    <label>Enter Logo Image URL:</label>
    <input [(ngModel)]="newKeg.image" type='text' class='form-control'><br>
    <label>Enter Bottle Image URL:</label>
    <input [(ngModel)]="newKeg.bottle" type='text' class='form-control'><br>

    <button (click)="submitNewKeg(newKeg)">Submit</button>
  </div>
  `
})

export class NewKegComponent {
  @Input() newKeg: Keg;
  @Output() newKegSender = new EventEmitter();

  submitNewKeg(newKeg) {
    this.newKegSender.emit(newKeg);
  }
}
