import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {listData, login} from "../state/data.actions";
import {DataRequest, initialRequest} from "../model/data-request.model";
import {selectAllUnits} from "../state/data.selectors";
import {Subject, takeUntil} from "rxjs";
import {Unit} from "../model/unit.model";

@Component({
  selector: 'app-get-units',
  templateUrl: './get-units.component.html',
  styleUrls: ['./get-units.component.scss']
})
export class GetUnitsComponent implements OnInit, OnDestroy {

  username: string = '';
  password: string = '';

  response: any;

  unit: string | null = null;
  vin: string | null = null;

  request = initialRequest();

  data$ = this.store.select(selectAllUnits);
  sub: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
  ) {

  }

  ngOnInit(): void {
    this.data$.pipe(takeUntil(this.sub))
      .subscribe({
        next: (data) => {
          this.getData(data);
        },
        error: (err) => {
          console.log('problem loading data: ', err);
        },
      });
  }

  ngOnDestroy(): void {
    this.sub.next(true);
    this.sub.complete();
  }

  getUnits() {
    this.request = {...this.request};
    this.request.user = this.username;
    this.request.pass = this.password;
    this.store.dispatch(login({request: this.request}))
  }

  getData(response: Unit[]){
    if( !response || response.length == 0 ){
      // nothing useful received here
      return;
    }
    this.response = response;
    this.unit = response[0].unitnumber
    this.vin = response[0].name

    this.request = {...this.request};
    this.request.unit = this.unit;
    this.store.dispatch(listData({request: this.request}))
  }
}
