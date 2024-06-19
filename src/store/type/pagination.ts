export type PaginationStore = {
  pagination: PaginationItemState;
  setPagination: (pagination: PaginationItemState) => void;
};

export type PaginationItemState = {
  pageIndex: number;
  pageSize: number;
  ascending: boolean;
  totalPage: number;
  firstPage: boolean;
  lastPage: boolean;
  sortField: string;
};

export type PaginationState = {
  pagination: PaginationItemState;
};

export const initialPaginationState: PaginationState = {
  pagination: {
    pageIndex: 0,
    pageSize: 1,
    ascending: true,
    sortField: 'id',
    totalPage: 0,
    firstPage: false,
    lastPage: false,
  },
};
