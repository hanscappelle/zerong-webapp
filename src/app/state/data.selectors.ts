import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TransactionState} from './data.state';

export const selectUnits = createFeatureSelector<TransactionState>('units');
export const selectLast = createFeatureSelector<TransactionState>('last');
export const selectData = createFeatureSelector<TransactionState>('data');

export const selectAllUnits = createSelector(
  selectUnits,
  (state: TransactionState) => state?.units,
);
export const selectOnlyLast = createSelector(
  selectLast,
  (state: TransactionState) => state?.last,
);
export const selectAllData = createSelector(
  selectData,
  (state: TransactionState) => state.data,
);

