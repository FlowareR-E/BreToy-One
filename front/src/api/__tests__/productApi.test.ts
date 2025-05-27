
import { ProductServices } from '../productApi';
import apiClient from '../axiosConfig';

jest.mock('../axiosConfig');

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('ProductServices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll should call apiClient.get with /products and return data', async () => {
    const mockProducts = [{ id: 1, name: 'Test', price: 10, quantity: 5, category: 'cat' }];
    mockedApiClient.get.mockResolvedValue(mockProducts);

    const result = await ProductServices.getAll();
    expect(mockedApiClient.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual(mockProducts);
  });

  it('create should call apiClient.post with /products and product', async () => {
    const newProduct = { name: 'New', price: 15, quantity: 3 };
    const savedProduct = { id: 1, ...newProduct };
    mockedApiClient.post.mockResolvedValue(savedProduct);

    const result = await ProductServices.create(newProduct);
    expect(mockedApiClient.post).toHaveBeenCalledWith('/products', newProduct);
    expect(result).toEqual(savedProduct);
  });

  it('update should call apiClient.put with /products/:id and product', async () => {
    const updateData = { name: 'Updated', price: 20, quantity: 7 };
    const updatedProduct = { id: 1, ...updateData };
    mockedApiClient.put.mockResolvedValue(updatedProduct);

    const result = await ProductServices.update(1, updateData);
    expect(mockedApiClient.put).toHaveBeenCalledWith('/products/1', updateData);
    expect(result).toEqual(updatedProduct);
  });

  it('delete should call apiClient.delete with /products/:id', async () => {
    mockedApiClient.delete.mockResolvedValue(undefined);

    await ProductServices.delete(1);
    expect(mockedApiClient.delete).toHaveBeenCalledWith('/products/1');
  });

  it('toggleStock should call apiClient.put /instock when inStock is true', async () => {
    mockedApiClient.put.mockResolvedValue(undefined);

    await ProductServices.toggleStock(1, true);
    expect(mockedApiClient.put).toHaveBeenCalledWith('/products/1/instock');
  });

  it('toggleStock should call apiClient.post /outofstock when inStock is false', async () => {
    mockedApiClient.post.mockResolvedValue(undefined);

    await ProductServices.toggleStock(1, false);
    expect(mockedApiClient.post).toHaveBeenCalledWith('/products/1/outofstock');
  });

  it('getMetrics should call apiClient.get /products/metrics and return data', async () => {
    const mockMetrics = { totalProducts: 10, totalProductsInStock: 8 };
    mockedApiClient.get.mockResolvedValue(mockMetrics);

    const result = await ProductServices.getMetrics();
    expect(mockedApiClient.get).toHaveBeenCalledWith('/products/metrics');
    expect(result).toEqual(mockMetrics);
  });
});
