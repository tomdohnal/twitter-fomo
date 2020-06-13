/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateList
// ====================================================

export interface CreateList_createList {
  /**
   * The document's ID.
   */
  readonly _id: string;
}

export interface CreateList {
  /**
   * Create a new document in the collection of 'List'
   */
  readonly createList: CreateList_createList;
}

export interface CreateListVariables {
  readonly list: ListInput;
}
