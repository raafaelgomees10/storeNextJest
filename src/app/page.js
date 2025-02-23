'use client'; // This is a client component 👈🏽

import { useFetchProducts } from '../hooks/use-fetch-products';
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';
import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cart';

export default function Home() {
  const { products, error } = useFetchProducts();
  const [term, setTerm] = useState('');
  const [localProducts, setLocalProducts] = useState('');
  const addToCart = useCartStore((store) => store.actions.add);

  useEffect(() => {
    if (term === '') {
      setLocalProducts(products);
    } else {
      setLocalProducts(
        products.filter(({ title }) => {
          return title.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1;
        })
      );
    }
  }, [products, term]);

  if (error) {
    return <h4 data-testid="server-error">Server is down</h4>;
  }

  const renderProductQuantity = () => {
    return localProducts.length === 1
      ? '1 Product'
      : `${localProducts.length} Products`;
  };

  return (
    <main data-testid="productList" className="my-8">
      <Search doSearch={(term) => setTerm(term)} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2x1 font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">
          {renderProductQuantity()}
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {localProducts.length === 0 ? (
            <h4 data-testid="no-products">No Products</h4>
          ) : (
            localProducts.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                addToCart={addToCart}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
