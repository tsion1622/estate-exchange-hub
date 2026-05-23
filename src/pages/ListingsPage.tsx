import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProperties } from '@/lib/storage';
import { PropertyCard } from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [priceSort, setPriceSort] = useState('newest');

  // Sync state from URL params (e.g., when coming from Navbar links)
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setType(searchParams.get('type') || 'all');
    setCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const properties = getProperties();

  const filteredProperties = properties.filter((p) => {
    const matchesQuery = !query || 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.location.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesType = type === 'all' || p.type === type;
    const matchesCategory = category === 'all' || p.category === category;
    
    return matchesQuery && matchesType && matchesCategory;
  }).sort((a, b) => {
    if (priceSort === 'low-high') return a.price - b.price;
    if (priceSort === 'high-low') return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const updateParams = (newQuery: string, newType: string, newCategory: string) => {
    const params: any = {};
    if (newQuery) params.q = newQuery;
    if (newType !== 'all') params.type = newType;
    if (newCategory !== 'all') params.category = newCategory;
    setSearchParams(params);
  };

  const handleTypeChange = (val: string) => {
    setType(val);
    updateParams(query, val, category);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    updateParams(query, type, val);
  };

  const handleSearchClick = () => {
    updateParams(query, type, category);
  };

  const resetFilters = () => {
    setQuery('');
    setType('all');
    setCategory('all');
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Explore Properties</h1>
          <p className="text-muted-foreground">
            Discover your next home, land plot, or commercial space.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-lg border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search location, title, or keywords..."
                className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-200 focus-visible:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              />
            </div>
            <Button onClick={handleSearchClick} className="h-12 px-8 font-bold rounded-xl">Search</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 mr-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters:
            </div>
            
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[140px] h-10 rounded-full bg-zinc-50">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[150px] h-10 rounded-full bg-zinc-50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="home">Homes</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceSort} onValueChange={setPriceSort}>
              <SelectTrigger className="w-[160px] h-10 rounded-full bg-zinc-50">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {(query || type !== 'all' || category !== 'all') && (
              <Button variant="ghost" onClick={resetFilters} className="h-10 text-red-500 hover:text-red-600 hover:bg-red-50">
                <X className="w-4 h-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center">
           <p className="text-sm font-medium">
             Showing <span className="text-primary font-bold">{filteredProperties.length}</span> properties
           </p>
        </div>

        {/* Results Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop, idx) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <PropertyCard property={prop} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200">
            <div className="bg-zinc-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
               <Search className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No matches found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              We couldn't find any properties matching your criteria. Try expanding your search or clearing filters.
            </p>
            <Button onClick={resetFilters} size="lg" className="rounded-full px-8">Reset All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};