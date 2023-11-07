import {Injectable} from '@angular/core';
import {BaseViewState} from './data.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {
  fetchFailed,
  lastTransmit, lastTransmitSuccess,
  listData,
  listDataSuccess, login, loginSuccess,
} from './data.actions';
import {of, switchMap, map, catchError} from 'rxjs';
import {MongolService} from "../service/mongol.service";

@Injectable()
export class DataEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<BaseViewState>,
    private readonly service: MongolService,
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.service.login(action.request).pipe(
          map((data) => loginSuccess({data})),
          catchError((error) => of(fetchFailed({error}))),
        ),
      ),
    ),
  );

  lastTransmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lastTransmit),
      switchMap((action) =>
        this.service.lastTransmit(action.request).pipe(
          map((last) => lastTransmitSuccess({last})),
          catchError((error) => of(fetchFailed({error}))),
        ),
      ),
    ),
  );

  listData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listData),
      switchMap((action) =>
        this.service.listTransmits(action.request).pipe(
          map((data) => listDataSuccess({data})),
          catchError((error) => of(fetchFailed({error}))),
        ),
      ),
    ),
  );

}
