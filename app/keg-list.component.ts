import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './task.model';

@Component({
  selector: 'keg-list',
  template: `

  <div class="row">
    <div *ngFor="let keg of childKegList" class="col-sm-1 bottledisplay">
      <div (click)="selectedKeg = keg; bottleClicked(selectedKeg)">
        <div class="bottle">
          <img class="bottleeffect" src={{keg.bottle}}>
        </div>
        <p [class]="chooseColor(keg)">{{keg.brand}} {{keg.name}} {{keg.style}} <br> Remaining Pints: {{keg.pints}}</p>
        <input type='radio' [(ngModel)]="growlerSize" [value]='1'>Single Pint<br>
        <input type='radio' [(ngModel)]="growlerSize" [value]='2'>Small Growler<br>
        <input type='radio' [(ngModel)]="growlerSize" [value]='4'>Large Growler<br>
        <button (click)="pourGrowler(keg, growlerSize)" class="btn">Pour Growler</button>

      </div>
    </div>
  </div>


  `
})


export class KegListComponent {
  @Input() childKegList: Task[];
  @Output() clickSender = new EventEmitter();

  bottleClicked(selectedKeg) {
    this.clickSender.emit(selectedKeg);
  }

  chooseColor(keg) {
    if(keg.pints <= 10) {
      return 'bg-red';
    } else if (keg.pints <= 30) {
      return 'bg-orange';
    } else if (keg.pints <= 50) {
      return 'bg-yellow';
    } else if (keg.pints <= 75) {
      return 'bg-green';
    } else {
      return 'bg-blue';
    }
  }

  pourGrowler(keg, growlerSize) {
    keg.pints>=growlerSize ? keg.pints -= growlerSize : undefined;
  }

}