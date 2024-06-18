export type MaterialStore = {
  material: MaterialState;
  setMaterials: (materials: MaterialItemState[]) => void;
};

export type MaterialItemState = {
  id: number;
  name: string;
  imageUrl: string;
  gram: number;
  createdDate: string;
  modifiedDate: string;
  models: MaterialPriceItemState[];
};

export type MaterialPriceItemState = {
  id: number;
  amount: number;
  price: number;
};

export type MaterialState = {
  materials: MaterialItemState[];
};

export const initialMaterialState: MaterialState = { materials: [] };
