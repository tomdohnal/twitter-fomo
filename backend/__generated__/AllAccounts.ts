/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: AllAccounts
// ====================================================

export interface AllAccounts_allAccounts_data_communities_data {
  /**
   * The document's ID.
   */
  readonly _id: string;
}

export interface AllAccounts_allAccounts_data_communities {
  /**
   * The elements of type 'Community' in this page.
   */
  readonly data: ReadonlyArray<(AllAccounts_allAccounts_data_communities_data | null)>;
}

export interface AllAccounts_allAccounts_data {
  /**
   * The document's ID.
   */
  readonly _id: string;
  readonly twitterId: string;
  readonly name: string;
  readonly communities: AllAccounts_allAccounts_data_communities;
  readonly type: AccountType;
}

export interface AllAccounts_allAccounts {
  /**
   * The elements of type 'Account' in this page.
   */
  readonly data: ReadonlyArray<(AllAccounts_allAccounts_data | null)>;
}

export interface AllAccounts {
  readonly allAccounts: AllAccounts_allAccounts;
}
