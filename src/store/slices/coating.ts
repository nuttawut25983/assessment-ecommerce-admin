import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  initialCoatingState,
  CoatingItemState,
  CoatingStore,
} from '@/store/type/coating';

export const useCoatingStore = create<CoatingStore, any>(
  devtools((set) => ({
    coating: initialCoatingState,
    setCoatings: (coatings: CoatingItemState[]) => {
      set(() => {
        return {
          coating: {
            coatings,
          },
        };
      });
    },
  })),
);
