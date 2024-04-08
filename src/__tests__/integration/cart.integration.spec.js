import { setAutoFreeze } from 'immer';
import Cart from '../../components/Cart';
import { useCartStore } from '../../store/cart';
import { makeServer } from '../../miragejs/server';
import userEvent from '@testing-library/user-event';
import { render, renderHook, screen, act } from '@testing-library/react';

setAutoFreeze(false);

describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;
  let toggle;
  let reset;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    reset = result.current.actions.reset;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add css class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should remove css class "hidden" in the component', () => {
    act(() => {
      toggle();
    });
    render(<Cart />);

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', async () => {
    render(<Cart />);

    const button = screen.getByTestId('close-button');

    await userEvent.click(button);
    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call store toggle() twice', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    render(<Cart />);
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
});
