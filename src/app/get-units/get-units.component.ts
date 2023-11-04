import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
    private http: HttpClient,
  ) {

  }

  getUnits() {
    // retrieve initial information from zero api
    const url = `/zero/mongol/api.php?commandname=get_units&format=json&user=${this.username}&pass=${this.password}`;
    this.http.get(url).subscribe(response => {
      this.response = response;
    });
  }
}
