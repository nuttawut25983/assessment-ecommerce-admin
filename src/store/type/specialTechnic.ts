export type SpecialTechnicStore = {
  specialTechnic: SpecialTechnicState;
  setSpecialTechnics: (specialTechnics: SpecialTechnicItemState[]) => void;
};

export type SpecialTechnicItemState = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  createdDate: string;
  modifiedDate: string;
};

export type SpecialTechnicState = {
  specialTechnics: SpecialTechnicItemState[];
};

export const initialSpecialTechnicState: SpecialTechnicState = {
  specialTechnics: [],
};
