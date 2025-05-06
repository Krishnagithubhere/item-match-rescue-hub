
export type ItemCategory = 'electronics' | 'clothing' | 'accessories' | 'personal' | 'documents' | 'other';

export type ItemStatus = 'lost' | 'found' | 'claimed' | 'returned';

export interface ItemLocation {
  address?: string;
  area: string;
  city: string;
  state?: string;
  country: string;
  details?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  date: string;
  location: ItemLocation;
  image?: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ItemFormData {
  title: string;
  description: string;
  category: ItemCategory;
  status: 'lost' | 'found';
  date: string;
  location: {
    area: string;
    city: string;
    state?: string;
    country: string;
    details?: string;
  };
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  image?: File | null;
}
