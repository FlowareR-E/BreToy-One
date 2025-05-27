import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { ProductTable } from "../ProductTable";

jest.mock("../../hooks/useProduct", () => ({
  useProducts: () => ({
    fetchProducts: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: "Product 1",
        category: "Category A",
        quantity: 5,
        price: 10,
        creationDate: "2023-01-01T00:00:00Z",
        updateDate: "2023-01-02T00:00:00Z",
      },
    ]),
    deleteProduct: jest.fn(),
    updateProduct: jest.fn(),
    createProduct: jest.fn(),
    toggleStock: jest.fn(),
    loading: false,
    error: null,
  }),
}));

describe("ProductTable", () => {
  it("renders products after fetching", async () => {
    await act(async () => {
      render(<ProductTable activeFilters={{}} categories={[]} />);
    });

    await waitFor(() => {
        expect(screen.getAllByText("Product 1").length).toBeGreaterThan(0);
    });

    expect(screen.getAllByText("Category A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$10.00").length).toBeGreaterThan(0);
  });
});
