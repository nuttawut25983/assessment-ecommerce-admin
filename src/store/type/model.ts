export type ModelStore = {
  model: ModelState;
  setModels: (models: ModelItemState[]) => void;
};

export type ModelItemState = {
  id: number;
  name: string;
  imageUrl: string;
  modelCode: string;
  createdDate: string;
  modifiedDate: string;
};

export type ModelState = {
  models: ModelItemState[];
};

export const initialModelState: ModelState = { models: [] };
