import { Component } from '@angular/core';




@Component({
  selector: 'app-root',
  template: `

    <div class="topbar">
      <img src="http://www.pourtaproom.com/wp-content/themes/pourtap2016/library/img/logo.png"/><h1>Tap Room</h1>
    </div>

    <div class ="row">
      <div *ngFor="let keg of kegs" class="col-sm-1 bottledisplay">
        <ul (click)="selectedKeg = keg">
          <div class="bottle">
            <img class="bottleeffect" src={{keg.bottle}}>
          </div>
          <li [class]="chooseColor(keg)">{{keg.brand}} {{keg.name}} {{keg.style}} - Remaining Pints:{{keg.pints}}</li>
          <button (click)="pourPint(keg)">Pour Pint</button><br>
          <input type='radio' [(ngModel)]="growlerSize" [value]='2'>Small <br>
          <input type='radio' [(ngModel)]="growlerSize" [value]='4'>Large
          <button (click)="pourGrowler(keg, growlerSize)">Pour Growler</button>

        </ul>
      </div>
      <button (click)="showNewForm()">Enter A New Keg</button>
    </div>

    <hr>
    <h1>Low Kegs</h1>
    <div>
      <ul *ngFor="let keg of kegs">
        <li *ngIf="keg.pints<10">{{keg.brand}} {{keg.name}} - Remaining Pints:{{keg.pints}}</li>
      </ul>
    </div>
    <hr>

    <div *ngIf='selectedKeg'>
      <h3>{{selectedKeg.brand}}</h3>
      <h4>{{selectedKeg.name}}</h4>
      <ul>
        <li [class]="choosePriceColor()"><span>$</span>{{selectedKeg.price}}</li>
        <li>{{selectedKeg.alcoholC}}</li>
        <li>{{selectedKeg.style}}</li>
        <img src={{selectedKeg.image}}>
      </ul>
      <button (click)="editKeg()">Edit Keg</button><br>

      <button (click)="selectedKeg = null;">Hide Details</button>
    </div>

    <div *ngIf="newKeg" class='form-control'>
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
      <label>Enter Image URL:</label>
      <input [(ngModel)]="newKeg.image" type='text' class='form-control'><br>
      <button (click)="submitNewKeg()">Submit</button>
    </div>

    <div *ngIf="editForm" class='form-control'>
      <label>Enter Keg Brand:</label>
      <input [(ngModel)]="selectedKeg.brand" type='text' class='form-control'><br>
      <label>Enter Keg Name:</label>
      <input [(ngModel)]="selectedKeg.name" type='text' class='form-control'><br>
      <label>Enter Price Per Pint:</label>
      <input [(ngModel)]="selectedKeg.price" type='number' class='form-control'><br>
      <label>Enter Alcohol Content:</label>
      <input [(ngModel)]="selectedKeg.alcoholC" type='text' class='form-control'><br>
      <label>Enter Beer Style:</label>
      <input [(ngModel)]="selectedKeg.style" type='text' class='form-control'><br>
      <label>Enter Image URL:</label>
      <input [(ngModel)]="selectedKeg.image" type='text' class='form-control'><br>
      <button (click)="hideEditForm()">Submit</button>
    </div>

  `
})

export class AppComponent {

  kegs: Keg[] = [
    new Keg('Stone IPA', 'Stone', 5.00, '6.9%', 'http://brickovencb.com/wp-content/uploads/2013/06/IPA_label_small.jpg', 'India Pale Ale', 'https://www.stonebrewing.com/sites/default/files/beer/menu/ipa_bottle_11.png'),
    new Keg('Black Butte', 'Deschutes', 5.25, '5.2%', 'http://www.thepizzapress.com/wp-content/uploads/2016/11/black_butte_porte_logo.jpg', 'Porter', 'https://www.deschutesbrewery.com/wp-content/uploads/2015/04/NS_bottle_36644_Deschutes_BlackButte12_Comp_R4_SMP3.png'),
    new Keg('Brooklyn', 'Brown Ale', 6.25, '5.6%', 'http://libationfront.com/wp-content/uploads/2015/02/361_Brooklyn-Brewery-Logo-w-Wings.jpeg.jpg', 'Porter', 'https://s-media-cache-ak0.pinimg.com/originals/4a/96/04/4a96041318369dfde3db92f974082fb2.png'),
    new Keg('Vienna', 'Moody Ales', 10.50, '6.75%', 'https://lh3.googleusercontent.com/-dj4mUWWLpO4/Vwj9mDAH0tI/AAAAAAAEHFg/sGq0PHH8Gas/image_thumb.png?imgmax=800', 'Lager', 'http://www.moodyales.com/img/beers/vienna-lager/bottle.png'),
    new Keg('Special Export', 'Guinness', 6.75, '8.0%', 'http://logodatabases.com/wp-content/uploads/2012/03/guinness-logo-black-1024x1024.jpg', 'Stout', 'http://www.bruguru.com/guinnessspecialexportlarge.gif'),
    new Keg('White Chocolate', 'Westwood', 9.75, '6.5%', 'https://pbs.twimg.com/profile_images/734649144023879680/rGLCgGIB.jpg', 'Stout', 'http://www.ilkleybrewery.co.uk/images/uploads/beers/bottleimg/_main/Westwood330ml_cutout_web_risized2.png'),
    new Keg('Terminator', 'McMenamins', 5.75, '6.45%', 'http://beerimages.pintley.com/8838/mcmenterm_large.png', 'Stout', 'http://dicksbeer.com/wp-content/uploads/2016/12/beerbottletransparent.png'),
  ];
  selectedKeg = null;
  newKeg: Keg = null;
  editForm = null;

  showNewForm() {
    this.newKeg = new Keg("", "", 0, "", "", "", "");
  }

  submitNewKeg() {
    if (this.newKeg.name !== "") {
      this.kegs.push(this.newKeg);
    }
    this.sortKegs();
    this.newKeg = null;
  }

  editKeg() {
    this.editForm = 1;
  }

  hideEditForm() {
    this.editForm = null;
  }

  pourPint(keg) {
    keg.pints>=1 ? keg.pints -= 1 : undefined;
  }

  pourGrowler(keg, growlerSize) {

    keg.pints>=growlerSize ? keg.pints -= growlerSize : undefined;
  }

  chooseColor(keg) {
    if(keg.pints <= 10) {
      return 'bg-danger';
    } else if (keg.pints <= 20) {
      return 'bg-warning';
    } else if (keg.pints <= 50) {
      return 'bg-info';
    } else {
      return 'bg-primary';
    }
  }

  choosePriceColor() {
    if(this.selectedKeg.price >= 10) {
      return 'bg-danger';
    } else if (this.selectedKeg.price >= 7) {
      return 'bg-warning';
    } else if (this.selectedKeg.price >= 4) {
      return 'bg-info';
    } else {
      return 'bg-primary';
    }
  }

  sortKegs() {
    this.kegs.sort(function(a, b) {
      return parseFloat(b.alcoholC) - parseFloat(a.alcoholC);
    });
  }


}

export class Keg {

  public pints: number = 124;

  constructor(public name: string, public brand: string, public price: number, public alcoholC: string, public image: string, public style: string, public bottle: string) {}

}
