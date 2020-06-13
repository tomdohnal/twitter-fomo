/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCommunities
// ====================================================

export interface AllCommunities_allCommunities_data {
  /**
   * The document's ID.
   */
  readonly _id: string;
  readonly name: string;
}

export interface AllCommunities_allCommunities {
  /**
   * The elements of type 'Community' in this page.
   */
  readonly data: ReadonlyArray<(AllCommunities_allCommunities_data | null)>;
}

export interface AllCommunities {
  readonly allCommunities: AllCommunities_allCommunities;
}
