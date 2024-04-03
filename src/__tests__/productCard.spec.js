import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

const product = {
  title: 'Camiseta Polo',
  price: '22.00',
  image:
    'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltab0908c0fd8a77e3/60db9270cbc6070f5c3c1d64/68a712aa7ffd3da7d91c2fe1469bda58990f7ab7.jpg?auto=webp&format=pjpg&width=3840&quality=60',
};

const addToCart = jest.fn();

const renderProductCard = () => {
  render(<ProductCard product={product} addToCart={addToCart} />);
};

describe('ProductCart', () => {
  it('should render ProdutCard', () => {
    renderProductCard();

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderProductCard();

    expect(screen.getByText(product.title)).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(product.price, 'i'))
    ).toBeInTheDocument();

    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it('should call props.addToCart() when button gets clicked', async () => {
    renderProductCard();
    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
