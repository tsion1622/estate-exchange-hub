import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building, LandPlot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export const Hero = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (type !== 'all') params.set('type', type);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/be254f08-06fc-4c40-ab3e-bfe0e3cee057/luxury-villa-1-795f8123-1779451068243.webp"
          className="w-full h-full object-cover"
          alt="Hero Background"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 py-1 px-3 text-sm bg-primary/20 text-white border-primary/30 backdrop-blur-md">
              Real Estate Excellence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Find Your Perfect <br />
              <span className="text-primary underline decoration-primary underline-offset-8">Property</span> Today.
            </h1>
            <p className="text-xl text-zinc-200 mb-10 max-w-2xl leading-relaxed">
              Explore the most exclusive properties for sale and rent. From luxury villas to commercial land, we help you find what you need with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/95 backdrop-blur-sm p-2 rounded-2xl shadow-2xl"
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex flex-col md:flex-row gap-2">
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setType}>
                  <TabsList className="grid grid-cols-3 h-12">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="sale">Buy</TabsTrigger>
                    <TabsTrigger value="rent">Rent</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    className="h-12 pl-10 border-none shadow-none focus-visible:ring-0 text-lg"
                    placeholder="Search by location, title, or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button size="lg" className="h-12 px-8 text-lg font-semibold rounded-xl">
                Search Properties
              </Button>
            </form>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-4 text-white">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <Building className="w-4 h-4" />
                <span className="text-sm">500+ Luxury Homes</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <LandPlot className="w-4 h-4" />
                <span className="text-sm">200+ Land Plots</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};