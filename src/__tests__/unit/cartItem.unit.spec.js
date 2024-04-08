import { setAutoFreeze } from 'immer';
import { useCartStore } from '../../store/cart';
import CartItem from '../../components/CartItem';
import userEvent from '@testing-library/user-event';
import { render, renderHook, screen, fireEvent } from '@testing-library/react';

setAutoFreeze(false);

const product = {
  title: 'Camiseta Polo',
  price: '22.00',
  image:
    'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltab0908c0fd8a77e3/60db9270cbc6070f5c3c1d64/68a712aa7ffd3da7d91c2fe1469bda58990f7ab7.jpg?auto=webp&format=pjpg&width=3840&quality=60',
};

const renderCartItem = () => {
  render(<CartItem product={product} />);
};

describe('CartItem', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i'))
    ).toBeInTheDocument();

    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });

  it('Should call remove() when remove buton is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'remove');

    renderCartItem();

    // const button = screen.getByTestId('remove-button');

    const button = screen.getByRole('button', { name: /remove/i });

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call increase() when increase button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'increase');

    renderCartItem();

    const button = screen.getByTestId('increase');

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call decrease() when increase button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'decrease');

    renderCartItem();

    const button = screen.getByTestId('decrease');

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
});
