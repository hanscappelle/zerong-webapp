import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TransactionState} from './data.state';

export const selectData = createFeatureSelector<TransactionState>('data');
export const selectUnits = createFeatureSelector<TransactionState>('units');

export const selectAllData = createSelector(
  selectData,
  (state: TransactionState) => state.data,
);

export const selectAllUnits = createSelector(
  selectUnits,
  (state: TransactionState) => state?.units,
);
