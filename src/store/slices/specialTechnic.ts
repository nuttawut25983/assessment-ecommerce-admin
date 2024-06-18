import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  initialSpecialTechnicState,
  SpecialTechnicItemState,
  SpecialTechnicStore,
} from '@/store/type/specialTechnic';

export const useSpecialTechnicStore = create<SpecialTechnicStore, any>(
  devtools((set) => ({
    specialTechnic: initialSpecialTechnicState,
    setSpecialTechnics: (specialTechnics: SpecialTechnicItemState[]) => {
      set(() => {
        return {
          specialTechnic: {
            specialTechnics,
          },
        };
      });
    },
  })),
);
