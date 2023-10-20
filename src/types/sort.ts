export enum SortDirection {
  /** По возрастанию */
  Ascending = "asc",
  /** По убыванию */
  Descending = "desc",
}

export type SortOption<SortableFields extends string> = {
  field: SortableFields;
  direction: SortDirection;
};
