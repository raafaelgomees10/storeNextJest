// const { default: Search } = require("@/components/Search");
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../../app/page';
import { makeServer } from '../../miragejs/server';

const renderProductList = () => {
  render(<ProductList />);
};

describe('ProductList', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('Should render a ProductList', () => {
    renderProductList();
    expect(screen.getByTestId('productList')).toBeInTheDocument();
  });

  it('Should render the ProductCard component 10 times', async () => {
    server.createList('product', 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });

  it.todo('Should render the no products message');
  it.todo('Should render the Search component');
  it.todo('Should filter the product list when a search is performed');
  it.todo('Should display error message when promise rejects');
  it.todo('Should display the total quantity of products');
  it.todo('Should display product (singular) when there is only 1 product');
});
