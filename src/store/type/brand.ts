export type BrandStore = {
  brand: BrandState;
  setBrands: (brands: BrandItemState[]) => void;
};

export type BrandItemState = {
  id: number;
  name: string;
  brandCount: number;
};

export type BrandState = {
  brands: BrandItemState[];
};

export const initialBrandState: BrandState = { brands: [] };
