import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getProductsByCategory } from '../../../data/catalog';
import CategoryContent from './category-content';
import styles from './page.module.css';

// Pre-render a static page for every known category.
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found | EasyDrops' };
  return {
    title: `${category.name} | EasyDrops`,
    description: `Shop discounted ${category.name} at EasyDrops.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className={styles.page}>
      <CategoryContent slug={slug} fallbackName={category.name} products={products} />
    </div>
  );
}
