import {Component, OnDestroy, OnInit} from '@angular/core';
import {selectAllData} from "../state/data.selectors";
import {Subject, takeUntil} from "rxjs";
import {Transmit} from "../model/transmit.model";
import {initialRequest} from "../model/data-request.model";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  data$ = this.store.select(selectAllData);
  sub: Subject<boolean> = new Subject<boolean>();
  request = initialRequest();

  data: Transmit[] = [];
  properties : string[] = [];

  constructor(
    private store: Store,
  ) {

  }

  ngOnInit(): void {
    this.data$.pipe(takeUntil(this.sub))
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.data = data;
            if(data && data.length > 0){
              this.properties = Object.keys(data[0]);
            }
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
