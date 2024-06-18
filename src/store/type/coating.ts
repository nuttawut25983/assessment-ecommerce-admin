export type CoatingStore = {
  coating: CoatingState;
  setCoatings: (coatings: CoatingItemState[]) => void;
};

export type CoatingItemState = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  createdDate: string;
  modifiedDate: string;
};

export type CoatingState = {
  coatings: CoatingItemState[];
};

export const initialCoatingState: CoatingState = { coatings: [] };
