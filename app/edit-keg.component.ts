import { Component, Input } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'edit-keg',
  template: `

  <div *ngIf="kegToEdit">
    <label>Enter Keg Brand:</label>
    <input [(ngModel)]="kegToEdit.brand" type='text' class='form-control'><br>
    <label>Enter Keg Name:</label>
    <input [(ngModel)]="kegToEdit.name" type='text' class='form-control'><br>
    <label>Enter Price Per Pint:</label>
    <input [(ngModel)]="kegToEdit.price" type='number' class='form-control'><br>
    <label>Enter Alcohol Content:</label>
    <input [(ngModel)]="kegToEdit.alcoholC" type='text' class='form-control'><br>
    <label>Enter Beer Style:</label>
    <input [(ngModel)]="kegToEdit.style" type='text' class='form-control'><br>
    <label>Enter Logo Image URL:</label>
    <input [(ngModel)]="kegToEdit.image" type='text' class='form-control'><br>
    <label>Enter Bottle Image URL:</label>
    <input [(ngModel)]="kegToEdit.bottle" type='text' class='form-control'><br>

     <button (click)="submitEditForm()">Submit</button>
  </div>

  `
})

export class EditKegComponent {
  @Input() kegToEdit: Keg;

  submitEditForm() {
    this.kegToEdit = null;
  }
}
