import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  BrandItemState,
  BrandStore,
  initialBrandState,
} from '@/store/type/brand';

export const useBrandStore = create<BrandStore, any>(
  devtools((set) => ({
    brand: initialBrandState,
    setBrands: (brands: BrandItemState[]) => {
      set(() => {
        return {
          brand: {
            brands,
          },
        };
      });
    },
  })),
);
