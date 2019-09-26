import { Injectable } from '@angular/core';
import * as chance from 'chance';

@Injectable({
  providedIn: 'root'
})
export class Chance {
  chance = new chance();
  constructor() {}

  getRandomString(options: any) {
    return this.chance.string(options);
  }

  getRandomInt(options: any) {
    return this.chance.integer(options);
  }
}
