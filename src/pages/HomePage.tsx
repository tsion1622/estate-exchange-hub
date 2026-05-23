import React from 'react';
import { Hero } from '@/components/Hero';
import { PropertyCard } from '@/components/PropertyCard';
import { getProperties } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const properties = getProperties().slice(0, 6);

  const features = [
    {
      title: 'Verified Listings',
      description: 'Every property on our platform undergoes a rigorous verification process.',
      icon: ShieldCheck,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Fast & Easy',
      description: 'Contact sellers and agents directly through our streamlined interface.',
      icon: Zap,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Expert Support',
      description: 'Our real estate experts are here to guide you through every step.',
      icon: Star,
      color: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <div className="pb-20">
      <Hero />

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Featured Listings</h2>
            <p className="text-muted-foreground max-w-lg">
              Explore our hand-picked selection of premium properties available for sale and rent.
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/listings">
              View All Properties
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <PropertyCard property={prop} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-zinc-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">What are you looking for?</h2>
          <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
            Browse properties by category to find exactly what you need.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Homes', icon: '🏠', count: '1,240', cat: 'home' },
              { name: 'Land', icon: '🌳', count: '450', cat: 'land' },
              { name: 'Commercial', icon: '🏢', count: '320', cat: 'commercial' },
              { name: 'Other', icon: '✨', count: '180', cat: 'other' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/listings?category=${cat.cat}`}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Feature Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-2xl ${feature.color} mb-6`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};