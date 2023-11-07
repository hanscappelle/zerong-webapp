import {Component, OnDestroy, OnInit} from '@angular/core';
import {selectAllData} from "../state/data.selectors";
import {Subject, takeUntil} from "rxjs";
import {Transmit} from "../model/transmit.model";
import {initialRequest} from "../model/data-request.model";
import {Store} from "@ngrx/store";
import {Chart, ChartType} from 'chart.js/auto'
import {formatDate} from "@angular/common";

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
  properties: string[] = [];
  selectedProperty: string = '';

  chartTypes = [
    'bar',
    'line',
    // 'bubble',
    // 'scatter',
    'radar'
  ];
  selectedChartType = 'bar';

  chart: any;

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
            if (data && data.length > 0) {
              // retrieves the properties available
              this.properties = Object.keys(data[0]);
              this.selectedProperty = this.properties[0] ?? '';
              this.createChart(data, this.selectedProperty);
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

  updateChart() {
    this.createChart(this.data, this.selectedProperty);
  }

  private createChart(data: Transmit[], property: string) {
    this.chart?.destroy();

    this.chart = new Chart("Chart", {
      type: this.selectedChartType as ChartType,
      data: {
        // values on X-Axis, date based
        labels: data.map(t => this.makeLabel(t)),
        datasets: [
          {
            label: property,
            data: this.valuesByDate(data, property),
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        //aspectRatio: 2.5,
      }

    });
  }

  private makeLabel(t: Transmit): string {
    if (t && t.datetime_actual && t.datetime_actual.length === "yyyyMMddHHmmss".length) {
      return t.datetime_actual.slice(6, 8) // day
        + '/'
        + t.datetime_actual.slice(4, 6) // month
        + ' '
        + t.datetime_actual.slice(8, 10) // hours
        + ':'
        + t.datetime_actual.slice(10, 12) // minutes
    } else {
      return "NaN";
    }
  }

  private valuesByDate(data: Transmit[], property: string) {
    return data.map(t => {
      const result = Object.entries(t).find(kv => kv[0] === property);
      if (result?.length === 2) {
        return result[1];
      } else {
        return 0;
      }
    });
  }

}
