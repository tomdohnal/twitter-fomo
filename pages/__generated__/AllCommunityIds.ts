/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCommunityIds
// ====================================================

export interface AllCommunityIds_allCommunities_data {
  /**
   * The document's ID.
   */
  readonly _id: string;
}

export interface AllCommunityIds_allCommunities {
  /**
   * The elements of type 'Community' in this page.
   */
  readonly data: ReadonlyArray<(AllCommunityIds_allCommunities_data | null)>;
}

export interface AllCommunityIds {
  readonly allCommunities: AllCommunityIds_allCommunities;
}
