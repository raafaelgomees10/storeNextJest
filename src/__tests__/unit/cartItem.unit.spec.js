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

  it('Should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('Should should increase quantity by 1 when second button is clicked', async () => {
    renderCartItem();

    const button = screen.getByTestId('increase');
    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('Should should decrease quantity by 1 when first button is clicked', async () => {
    renderCartItem();

    const buttonIncrease = screen.getByTestId('increase');
    const buttonDecrease = screen.getByTestId('decrease');

    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('2');

    await fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });

  it('Should not go below zero in quantity', async () => {
    renderCartItem();

    const buttonDecrease = screen.getByTestId('decrease');

    const quantity = screen.getByTestId('quantity');

    expect(quantity.textContent).toBe('1');

    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe('0');
  });

  it('Should call remove() when remove buton is clicked', async () => {
    const result = renderHook(() => useCartStore()).result;

    const spy = jest.spyOn(result.current.actions, 'remove');

    renderCartItem();

    // const button = screen.getByTestId('remove-button');

    const button = screen.getByRole('button', { name: /remove/i });

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
});
