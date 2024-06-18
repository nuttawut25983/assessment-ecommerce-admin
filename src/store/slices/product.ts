import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  initialProductState,
  ProductItemState,
  ProductStore,
} from '@/store/type/product';

export const useProductStore = create<ProductStore, any>(
  devtools((set) => ({
    product: initialProductState,
    setProducts: (products: ProductItemState[]) => {
      set(() => {
        return {
          product: {
            products,
          },
        };
      });
    },
  })),
);
