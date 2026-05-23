import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyById } from '@/lib/storage';
import { Bed, Bath, Maximize, MapPin, Share2, Heart, CheckCircle2, Phone, Mail, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const PropertyDetailsPage = () => {
  const { id } = useParams();
  const property = id ? getPropertyById(id) : null;

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-10">The property you are looking for might have been removed or doesn't exist.</p>
        <Button asChild size="lg">
          <Link to="/listings">Explore Other Listings</Link>
        </Button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mx-auto px-4 py-8"
    >
      {/* Breadcrumb / Back Navigation */}
      <nav className="mb-8">
        <Link to="/listings" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-zinc-100 px-4 py-2 rounded-full">
          &larr; Back to all listings
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="px-4 py-1.5 text-xs uppercase font-black tracking-widest">
                For {property.type}
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 text-xs uppercase font-bold bg-zinc-50">
                {property.category}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-zinc-500 text-xl">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  {property.location}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => toast.success('Added to favorites')}>
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => toast.success('Link copied to clipboard')}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Visual "Brochure" Image */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl">
                 <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest block mb-1">Property ID</span>
                 <span className="text-xl font-mono font-bold">#{property.id.toUpperCase()}</span>
              </div>
            </div>
          </motion.div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Bedrooms', val: property.bedrooms ?? 'N/A', icon: Bed },
              { label: 'Bathrooms', val: property.bathrooms ?? 'N/A', icon: Bath },
              { label: 'Total Area', val: `${property.area.toLocaleString()} sqft`, icon: Maximize },
              { label: 'Year Built', val: '2022', icon: FileText },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-lg transition-all">
                <div className="p-3 bg-white rounded-2xl shadow-sm mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-black">{stat.val}</div>
                <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight">About this property</h2>
              <p className="text-zinc-600 leading-relaxed text-lg">
                {property.description}
              </p>
              <div className="pt-4 border-t">
                 <h3 className="font-bold mb-4 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-primary" />
                   Highlights
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {property.features.map((f, i) => (
                     <Badge key={i} variant="secondary" className="rounded-full px-4 py-1 bg-zinc-100 text-zinc-700 hover:bg-zinc-200">
                       {f}
                     </Badge>
                   ))}
                 </div>
              </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Premium Features</h3>
                <ul className="space-y-4">
                   {property.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-zinc-300">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                 <Button className="w-full h-14 rounded-2xl font-bold bg-white text-zinc-900 hover:bg-zinc-200 group">
                    Schedule a Viewing
                    <motion.span className="ml-2 group-hover:translate-x-1 transition-transform">→</motion.span>
                 </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Transaction Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div>
                  <div className="text-sm font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">
                    Market Value
                  </div>
                  <div className="text-5xl font-black text-primary flex items-baseline gap-1">
                    {formattedPrice}
                    {property.type === 'rent' && <span className="text-xl text-zinc-400 font-bold">/mo</span>}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full h-16 text-xl font-black rounded-2xl shadow-xl shadow-primary/20" onClick={() => toast.success('Our agents will contact you shortly!')}>
                     Interested? Contact Us
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <Button variant="outline" className="h-14 rounded-2xl flex items-center gap-2 font-bold">
                       <Phone className="w-5 h-5" />
                       Call
                     </Button>
                     <Button variant="outline" className="h-14 rounded-2xl flex items-center gap-2 font-bold">
                       <Mail className="w-5 h-5" />
                       Inquire
                     </Button>
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-zinc-200 overflow-hidden">
                       <img src="https://i.pravatar.cc/150?u=agent" alt="Agent" />
                    </div>
                    <div>
                      <div className="font-black">Sarah Jenkins</div>
                      <div className="text-sm text-zinc-500">Senior Property Specialist</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
               <div className="flex items-center gap-3 mb-4">
                 <Download className="w-6 h-6 text-primary" />
                 <h3 className="text-xl font-bold tracking-tight">Digital Brochure</h3>
               </div>
               <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                 Get the full property dossier including high-res photos, floor plans, and investment analysis.
               </p>
               <Button variant="secondary" className="w-full h-12 rounded-xl font-bold bg-white border shadow-sm" onClick={() => toast.info('Generating secure download link...')}>
                 Download PDF Profile
               </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};