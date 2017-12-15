import { createSelector } from 'reselect';
import { selectActiveAccountId } from './accounts.js';

export const selectAllTransactions = state => state.transactions;

export const selectTransactionsForActiveAccount = createSelector(
  selectAllTransactions,
  selectActiveAccountId,
  (transactions, accountId) => {
    return transactions.filter(
      transaction => transaction.get('account_id') === accountId
    );
  }
);

export const selectTransactionsForActiveAccountSorted = createSelector(
  selectTransactionsForActiveAccount,
  transactions => {
    return transactions.sort(
      (b, a) => a.get('dateObj') - b.get('dateObj')
    );
  }
);
