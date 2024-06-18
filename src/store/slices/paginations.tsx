import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { PaginationItemState, PaginationStore } from '@/store/type/pagination';

export const usePaginationStore = create<PaginationStore, any>(
  devtools((set) => ({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
      ascending: true,
      totalPage: 0,
      firstPage: false,
      lastPage: false,
    },
    setPagination: (pagination: PaginationItemState) =>
      set(() => {
        return {
          pagination: pagination,
        };
      }),
  })),
);
