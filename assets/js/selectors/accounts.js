import { createSelector } from 'reselect';

export const selectActiveAccountId = state => state.activeAccount;

export const selectAllAccounts = state => state.accounts;

export const selectActiveAccount = createSelector(
  selectActiveAccountId,
  selectAllAccounts,
  (accountId, accounts) => {
    return accounts.find(account => account.get('id') === accountId);
  }
);

export const selectDefaultAccount = state => {
  return selectActiveAccount(state) || selectAllAccounts(state).get(0);
};
