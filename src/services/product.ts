import Http from '@/api/Http';

const PATH = '/product';

type FetchData = {
  pageIndex: number;
  pageSize: number;
  sortField: string;
  ascending: boolean;
};

const productService = {
  // getProducts: async () => {
  //   try {
  //     const url = `${PATH}`;
  //     const res = await Http.get(url);
  //     return res.data;
  //   } catch (err) {
  //     return err;
  //   }
  // },
  getProductPagination: async ({
    pageIndex,
    pageSize,
    sortField,
    ascending,
  }: FetchData) => {
    try {
      const url = `${PATH}/admin?page=${pageIndex}&size=${pageSize}&sortField=${sortField}&ascending=${ascending}`;
      return await Http.get(url);
    } catch (err) {
      return err;
    }
  },
  // getProduct: async (id: string) => {
  //   try {
  //     const url = `${PATH}/${id}`;
  //     const res = await Http.get(url);
  //     return res.data;
  //   } catch (err) {
  //     return err;
  //   }
  // },
  createProduct: async (data: any) => {
    try {
      const url = `${PATH}`;
      return await Http.post(url, data);
    } catch (err) {
      return err;
    }
  },
  updateProduct: async (id: string, data: any) => {
    try {
      const url = `${PATH}/${id}`;
      return await Http.put(url, data);
    } catch (err) {
      return err;
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const url = `${PATH}/${id}`;
      const res = await Http.delete(url);
      return res.data;
    } catch (err) {
      return err;
    }
  },
};

export default productService;
