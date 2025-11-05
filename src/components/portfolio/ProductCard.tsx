import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { trackClick } from '../../lib/analytics';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
    });
    toast.success(`${product.name} added to cart!`);
    trackClick(`add_to_cart_${product.slug}`, 'button');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-gradient-to-br from-navy to-deepBg rounded-2xl overflow-hidden border-2 border-cyan/30 hover:border-orange hover:shadow-orange-glow transition-all duration-300"
    >
      {product.thumbnail_url && (
        <div className="h-48 bg-gradient-to-br from-cyan/20 to-orange/20 flex items-center justify-center">
          <img
            src={product.thumbnail_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-cyan/20 text-cyan text-sm font-medium rounded-full">
            {product.category}
          </span>
          <span className="text-2xl font-bold text-orange">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{product.short_description}</p>

        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">What's Included:</p>
          <ul className="space-y-2">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start text-gray-300 text-sm">
                <Check className="h-4 w-4 text-cyan mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="text-cyan text-sm font-medium">
                +{product.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        <Button
          onClick={handleAddToCart}
          size="md"
          className="w-full"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
