import { Component } from '@angular/core';
import { Keg } from './keg.model';



@Component({
  selector: 'app-root',
  template: `

    <div class="topbar">
      <img src="http://www.pourtaproom.com/wp-content/themes/pourtap2016/library/img/logo.png"/><h1>Tap Room</h1>
    </div>
    <div class="row showborder">
      <div class="row centered">
        <p><span class="largetext">-&#123; </span><span class="smalltext">JUNE</span><span class="largetext"> HAPPY HOUR </span><span class="smalltext">2017</span><span class="largetext"> &#125;-</span></p>
      </div>
      <div class="row centered">
        <p class="mediumtext">4:00PM - 6:00PM EVERYDAY</p>
      </div>
    </div>

    <keg-list [childKegList]="masterKegList" (clickSender)="selectKeg($event)"></keg-list>
    <new-keg [newKeg]="newKeg" (newKegSender)="submitNewKeg($event)"></new-keg>

    <div class="row centered">
      <br>
      <button (click)="showNewForm()" class="btn">Enter A New Keg</button>
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
      <div *ngFor='let thisKeg of kegDetailsArray'>
        <h3>{{thisKeg.brand}}</h3>
        <h4>{{thisKeg.name}}</h4>
        <ul>
          <li [class]="choosePriceColor()"><span>$</span>{{thisKeg.price}}</li>
          <li>{{thisKeg.alcoholC}}</li>
          <li>{{thisKeg.style}}</li>
          <img src={{thisKeg.image}}>
        </ul>
        <button (click)="editKeg()" class="btn">Edit Keg</button><br>

        <button (click)="selectedKeg = null; kegDetailsArray = []" class="btn">Hide Details</button>
      </div>
    </div>

    <edit-keg [kegToEdit]="kegToEdit"></edit-keg>

  `
})

export class AppComponent {

  masterKegList: Keg[] = [
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
  kegToEdit = null;
  kegDetailsArray: Keg[] = [];

  showNewForm() {
    this.newKeg = new Keg("", "", 0, "", "", "", "");
  }

  submitNewKeg(newKeg) {
    if (newKeg.name !== "") {
      this.masterKegList.push(newKeg);
    }
    this.sortKegs();
    this.newKeg = null;
  }

  editKeg() {
    this.kegToEdit = this.selectedKeg;
  }

  selectKeg(keg) {
    this.selectedKeg = keg;
    this.kegDetailsArray.push(keg);
    console.log(this.kegDetailsArray);
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
    this.masterKegList.sort(function(a, b) {
      return parseFloat(b.alcoholC) - parseFloat(a.alcoholC);
    });
  }


}
