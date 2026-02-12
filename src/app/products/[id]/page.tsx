import { products } from '@/lib/data';
import ProductDetail from './ProductPageClient';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default function Page() {
    return <ProductDetail />;
}
