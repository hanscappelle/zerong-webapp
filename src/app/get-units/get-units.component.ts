import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {lastTransmit, listData, login} from "../state/data.actions";
import {initialRequest} from "../model/data-request.model";
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

  units: number[] = [];
  selectedUnit = 0;
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

  getData(response: Unit[]) {
    if (!response || response.length == 0) {
      // nothing useful received here
      return;
    }
    this.response = response;
    this.units = [...Array(response.length).keys()]
    this.selectedUnit = 0;
    this.updateUnit();
    this.fetchData();
  }

  private fetchData(): void {
    this.request = {...this.request};
    this.request.unit = this.unit;
    this.store.dispatch(lastTransmit({request: this.request}))
    this.store.dispatch(listData({request: this.request}))
  }

  updateUnit(): void {
    this.unit = this.response[this.selectedUnit].unitnumber;
    this.vin = this.response[this.selectedUnit].name;
    this.fetchData();
  }
}
