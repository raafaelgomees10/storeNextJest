// const { default: Search } = require("@/components/Search");
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductList from '../../app/page';
import { makeServer } from '../../miragejs/server';
import { Response } from 'miragejs';
import userEvent from '@testing-library/user-event';

//userEvent utiliza para digitar no campo de busca
//fireEvent utiliza para fazer submit no form

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

  it('Should render the "no products message"', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId('no-products')).toBeInTheDocument();
    });
  });

  it('Should display error message when promise rejects', async () => {
    server.get('products', () => {
      return new Response(500, {}, '');
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId('server-error')).toBeInTheDocument();
      expect(screen.queryByTestId('no-products')).toBeNull();
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
    });
  });

  fit('Should filter the product list when a search is performed', async () => {
    const searchTerm = 'Camiseta Polo';

    server.createList('product', 2);

    server.create('product', {
      title: searchTerm,
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    });

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, searchTerm);
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    });
  });

  it.todo('Should display the total quantity of products');
  it.todo('Should display product (singular) when there is only 1 product');
});
