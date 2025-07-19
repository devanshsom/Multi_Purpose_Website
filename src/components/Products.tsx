import { useState, useEffect } from 'react';
import { Search, Filter, Star, ShoppingCart, Heart, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  description: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Sample product data
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        reviews: 1234,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
        tags: ["wireless", "bluetooth", "noise-canceling"],
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 249,
        rating: 4.6,
        reviews: 856,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
        tags: ["fitness", "smartwatch", "gps"],
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: "Organic Coffee Beans",
        price: 24,
        rating: 4.9,
        reviews: 456,
        category: "food",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
        description: "Premium organic coffee beans sourced from sustainable farms.",
        tags: ["organic", "fair-trade", "premium"],
        inStock: true,
        featured: false
      },
      {
        id: 4,
        name: "Minimalist Desk Lamp",
        price: 89,
        originalPrice: 120,
        rating: 4.4,
        reviews: 234,
        category: "home",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "Modern LED desk lamp with adjustable brightness and wireless charging base.",
        tags: ["led", "wireless-charging", "modern"],
        inStock: true,
        featured: false
      },
      {
        id: 5,
        name: "Vintage Leather Jacket",
        price: 189,
        rating: 4.7,
        reviews: 678,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        description: "Classic vintage-style leather jacket made from genuine leather.",
        tags: ["leather", "vintage", "classic"],
        inStock: false,
        featured: false
      },
      {
        id: 6,
        name: "Professional Camera Lens",
        price: 599,
        rating: 4.9,
        reviews: 123,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
        description: "High-performance telephoto lens for professional photography.",
        tags: ["photography", "telephoto", "professional"],
        inStock: true,
        featured: true
      },
      {
        id: 7,
        name: "Ergonomic Office Chair",
        price: 349,
        originalPrice: 449,
        rating: 4.5,
        reviews: 567,
        category: "home",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
        tags: ["ergonomic", "office", "comfort"],
        inStock: true,
        featured: false
      },
      {
        id: 8,
        name: "Artisan Tea Collection",
        price: 45,
        rating: 4.6,
        reviews: 289,
        category: "food",
        image: "https://images.unsplash.com/photo-1597318821089-425c7c23e8e4?w=400&h=300&fit=crop",
        description: "Curated collection of premium artisan teas from around the world.",
        tags: ["tea", "artisan", "collection"],
        inStock: true,
        featured: false
      }
    ];
    
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Office' },
    { value: 'food', label: 'Food & Beverages' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' }
  ];

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Product Showcase</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive product listing with advanced filtering, sorting, and search capabilities. 
            Demonstrates modern e-commerce UI patterns and user experience design.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="glass mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter Toggle */}
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="cursor-pointer">In Stock ({products.filter(p => p.inStock).length})</Badge>
                    <Badge variant="secondary" className="cursor-pointer">Featured ({products.filter(p => p.featured).length})</Badge>
                    <Badge variant="secondary" className="cursor-pointer">On Sale ({products.filter(p => p.originalPrice).length})</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden interactive-card glass group">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.featured && (
                    <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      Sale
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Add to Cart */}
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <Card className="glass">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground text-lg mb-4">
                No products found matching your criteria.
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Products;