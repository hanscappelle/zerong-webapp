import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DataRequest} from "../model/data-request.model";
import {Transmit} from "../model/transmit.model";
import {Unit} from "../model/unit.model";

@Injectable({
  providedIn: 'root'
})
export class MongolService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getUnits(user: string, pass: string): Observable<any> {
    // retrieve initial information from zero api
    //const url = `/zero/mongol/api.php?commandname=get_units&format=json&user=${this.username}&pass=${this.password}`;
    const url = `https://hcpl.be/api2/mongol-api.php?command=get_units&user=${user}&pass=${pass}`;
    return this.http.get(url);
  }

  getLastTransmit(user: string, pass: string, unit: string): Observable<any> {
    //const url = "https://mongol.brono.com/mongol/api.php?commandname=get_last_transmit&format=json&user=yourusername&pass=yourpass&unitnumber=https://mongol.brono.com/mongol/api.php?commandname=get_last_transmit&format=json&user=&pass=&unitnumber=";
    const url = `https://hcpl.be/api2/mongol-api.php?command=get_last_transmit&user=${user}&pass=${pass}&unit=${unit}`;
    return this.http.get(url);
  }

  getHistory(user: string, pass: string, unit: string, start: string, end: string): Observable<any> {
    // start and end date format is yyyyMMddHHmmss with time optional
    // als this is limited to max 2 days a time, so update this call to combine when more
    // from what I remember there is a 1 year limit back in time also
    const url = `https://hcpl.be/api2/mongol-api.php?command=get_history&user=${user}&pass=${pass}&unit=${unit}&start=${start}&end=${end}`;
    return this.http.get(url);
  }

  listTransmits(request: DataRequest): Observable<Transmit[]> {
    // TODO implement getting history per 2 days
    return this.getLastTransmit(request.user, request.pass, request.unit ?? '');//, request.start, request.end)
  }

  login(request: DataRequest): Observable<Unit[]> {
    return this.getUnits(request.user, request.pass);
  }
}
