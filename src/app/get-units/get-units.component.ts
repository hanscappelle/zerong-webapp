import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MongolService} from "../service/mongol.service";

@Component({
  selector: 'app-get-units',
  templateUrl: './get-units.component.html',
  styleUrls: ['./get-units.component.scss']
})
export class GetUnitsComponent {

  username: string = '';
  password: string = '';

  response: any;

  constructor(
    private service: MongolService,
  ) {

  }

  getUnits() {
    this.service.getUnits(this.username, this.password).subscribe(
      response => this.response = response
    );

  }
}
