import { Response } from 'miragejs';
import { makeServer } from '../miragejs/server';
import { useFetchProducts } from './use-fetch-products';
import { renderHook, waitFor } from '@testing-library/react';

describe('useFetchProducts', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('Should return a list of 10 products', async () => {
    server.createList('product', 10);

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => expect(result.current.products).toHaveLength(10));

    expect(result.current.error).toBe(false);
  });

  it('Should set error to true when catch() block is executed', async () => {
    server.get('products', () => {
      return new Response(500, {}, '');
    });

    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.error).toBe(false);

    await waitFor(() => expect(result.current.products).toHaveLength(0));
  });
});
