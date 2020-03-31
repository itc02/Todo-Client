import { Component } from '@angular/core';
import { angularComponent } from '../config/constants';
import * as moment from 'moment';

@Component({
  selector: angularComponent.selector.app,
  templateUrl: angularComponent.templateUrl.app,
  styleUrls: angularComponent.styleUrls.app
})

export class AppComponent {
  day = moment().format('dddd, YYYY-MM-DD');
  time = moment().format('hh:mm:ss a');

  constructor() {
    setInterval(() => {
      this.day = moment().format('dddd, YYYY-MM-DD');
      this.time = moment().format('hh:mm:ss a');

    }, 1000);
  }
}
