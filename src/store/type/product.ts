export type ProductStore = {
  product: ProductState;
  setProducts: (products: ProductItemState[]) => void;
};

export type ProductItemState = {
  id: number;
  name: string;
  imageUrl: string;
  brand: BrandDTO;
  createdDate: string;
  modifiedDate: string;
  models: any[];
};

export type ProductState = {
  products: ProductItemState[];
};

export type BrandDTO = {
  id: number;
  name: string;
};

export const initialProductState: ProductState = { products: [] };
