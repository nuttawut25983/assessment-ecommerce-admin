import Http from '@/api/Http';

const PATH = '/brands';

const brandService = {
  getBrands: async () => {
    try {
      const url = `${PATH}`;
      return await Http.get(url);
    } catch (err) {
      return err;
    }
  },
  getBrandsAdmin: async () => {
    try {
      const url = `${PATH}/admin`;
      return await Http.get(url);
    } catch (err) {
      return err;
    }
  },
  createBrand: async (data: any) => {
    try {
      const url = `${PATH}`;
      return await Http.post(url, data);
    } catch (err) {
      return err;
    }
  },
  updateBrand: async (id: string, data: any) => {
    try {
      const url = `${PATH}/${id}`;
      return await Http.put(url, data);
    } catch (err) {
      return err;
    }
  },
  deleteBrand: async (id: number) => {
    try {
      const url = `${PATH}/${id}`;
      return await Http.delete(url);
    } catch (err) {
      return err;
    }
  },
};

export default brandService;
