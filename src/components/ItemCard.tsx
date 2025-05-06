
import { Item } from '@/types/item';
import { formatDate, getCategoryColorClass, getStatusBadgeColor } from '@/utils/itemUtils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const categoryClass = getCategoryColorClass(item.category);
  const statusClass = getStatusBadgeColor(item.status);
  
  return (
    <Link to={`/items/${item.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div className="relative h-48 overflow-hidden">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full ${categoryClass} flex items-center justify-center`}>
              <span className="text-gray-600 text-xl font-semibold capitalize">{item.category}</span>
            </div>
          )}
          <Badge className={`absolute top-2 right-2 ${statusClass}`}>
            {item.status === 'lost' ? 'Lost' : 'Found'}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {item.description}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(item.date)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{item.location.area}, {item.location.city}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2">
          <Badge variant="outline" className={getCategoryColorClass(item.category)}>
            {item.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Posted {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
