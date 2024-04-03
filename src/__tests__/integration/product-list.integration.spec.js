// const { default: Search } = require("@/components/Search");
import { render, screen } from '@testing-library/react';
import ProductList from '../../app/page';

describe('ProductList', () => {
  it('Should render a ProductList', () => {
    render(<ProductList />);

    expect(screen.getByTestId('productList')).toBeInTheDocument();
  });
});
