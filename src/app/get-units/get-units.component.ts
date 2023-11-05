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

  unit: string = '';
  vin: string = '';

  constructor(
    private service: MongolService,
  ) {

  }

  getUnits() {
    this.service.getUnits(this.username, this.password).subscribe(
      response => {
        this.response = response
        console.log("received response is ", response)
        this.unit = response[0].unitnumber
        this.vin = response[0].name
      }
    );

  }
}
