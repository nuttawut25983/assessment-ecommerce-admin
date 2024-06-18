import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  initialModelState,
  ModelItemState,
  ModelStore,
} from '@/store/type/model';

export const useModelStore = create<ModelStore, any>(
  devtools((set) => ({
    model: initialModelState,
    setModels: (models: ModelItemState[]) => {
      set(() => {
        return {
          model: {
            models,
          },
        };
      });
    },
  })),
);
