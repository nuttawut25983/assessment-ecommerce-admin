import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  initialMaterialState,
  MaterialItemState,
  MaterialStore,
} from '@/store/type/material';

export const useMaterialStore = create<MaterialStore, any>(
  devtools((set) => ({
    material: initialMaterialState,
    setMaterials: (materials: MaterialItemState[]) => {
      set(() => {
        return {
          material: {
            materials,
          },
        };
      });
    },
  })),
);
