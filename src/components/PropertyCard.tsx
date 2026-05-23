import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Property } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link to={`/property/${property.id}`} className="block group transition-transform hover:-translate-y-1">
      <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="capitalize shadow-sm">
              For {property.type}
            </Badge>
            <Badge variant="outline" className="capitalize bg-background/80 backdrop-blur-sm border-none shadow-sm">
              {property.category}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <span className="text-xl font-bold text-primary whitespace-nowrap">
              {formattedPrice}{property.type === 'rent' && '/mo'}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {property.description}
          </p>
          <div className="flex items-center justify-between border-t pt-4">
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1 text-sm font-medium">
                <Bed className="w-4 h-4 text-primary" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1 text-sm font-medium">
                <Bath className="w-4 h-4 text-primary" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-sm font-medium">
              <Maximize className="w-4 h-4 text-primary" />
              <span>{property.area.toLocaleString()} {property.category === 'land' ? 'sqft' : 'sqft'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};