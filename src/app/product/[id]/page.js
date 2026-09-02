import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts } from '../../../data/catalog';
import ProductDetail from './product-detail';
import styles from './page.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: 'Product Not Found | EasyDrops' };
  return {
    title: `${product.title} | EasyDrops`,
    description: `Buy ${product.title} at EasyDrops.`,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <div className={styles.page}>
      <ProductDetail product={product} related={related} />
    </div>
  );
}
