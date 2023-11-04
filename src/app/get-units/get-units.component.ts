import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-get-units',
  templateUrl: './get-units.component.html',
  styleUrls: ['./get-units.component.scss']
})
export class GetUnitsComponent {

  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
  ){

  }

  getUnits() {
    // TODO fix cors

    const url = `https://mongol.brono.com/mongol/api.php?commandname=get_units&format=json?user=${this.username}&pass=${this.password}`;
    console.log('response: ', this.http.get(url).subscribe())
  }
}
