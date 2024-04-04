import { useFetchProducts } from '../hooks/use-fetch-products';
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';
import Image from 'next/image';

export default function Home() {
  const { products, error } = useFetchProducts();
  const doSearch = () => {};

  return (
    <main data-testid="productList" className="my-8">
      <Search doSearch={doSearch} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2x1 font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <span className="mt-3 text-sm text-gray-500">Templates</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-columns">
          {products.map((product) => (
            <ProductCard product={{}} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
