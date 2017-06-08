import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "priciness",
  pure: false
})


export class PricePipe implements PipeTransform {
  transform(kegs: Keg[], price) {
    var output: Keg[] = [];
    for (var i = 0; i < kegs.length; i++) {
      if (kegs[i].price <= price) {
        output.push(kegs[i]);
      }
    }
    return output;
  }
}
