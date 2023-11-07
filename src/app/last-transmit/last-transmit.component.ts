import {Component, OnDestroy, OnInit} from '@angular/core';
import {selectAllData, selectAllUnits} from "../state/data.selectors";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {initialRequest} from "../model/data-request.model";
import {Transmit} from "../model/transmit.model";

@Component({
  selector: 'app-last-transmit',
  templateUrl: './last-transmit.component.html',
  styleUrls: ['./last-transmit.component.scss']
})
export class LastTransmitComponent implements OnInit, OnDestroy {

  data$ = this.store.select(selectAllData);
  sub: Subject<boolean> = new Subject<boolean>();
  lastTransmit: Transmit | null = null;

  request = initialRequest();

  constructor(
    private store: Store,
  ) {

  }

  ngOnInit(): void {
    this.data$.pipe(takeUntil(this.sub))
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.lastTransmit = data[0];
          }
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
}
