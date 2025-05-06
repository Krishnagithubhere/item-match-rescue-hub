
import { Item, ItemCategory, ItemStatus } from "@/types/item";
import { v4 as uuidv4 } from 'uuid';

// Mock data for initial display
export const mockItems: Item[] = [
  {
    id: "1",
    title: "iPhone 13 Pro in Black Case",
    description: "Lost my iPhone 13 Pro with a black leather case. The phone has a lock screen with a picture of a mountain landscape. It was fully charged when lost.",
    category: "electronics",
    status: "lost",
    date: "2025-05-01",
    location: {
      area: "Central Park",
      city: "New York",
      state: "NY",
      country: "USA",
      details: "Near Bethesda Fountain"
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=85&w=400",
    contact: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567"
    },
    createdAt: "2025-05-03T14:48:00.000Z",
    updatedAt: "2025-05-03T14:48:00.000Z"
  },
  {
    id: "2",
    title: "Black Leather Wallet",
    description: "Found a black leather wallet containing ID and credit cards. The ID has the name 'Sarah Johnson' on it.",
    category: "accessories",
    status: "found",
    date: "2025-05-02",
    location: {
      area: "Main Street Coffee Shop",
      city: "Boston",
      state: "MA",
      country: "USA",
      details: "At a table near the window"
    },
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&q=85&w=400",
    contact: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-987-6543"
    },
    createdAt: "2025-05-03T16:30:00.000Z",
    updatedAt: "2025-05-03T16:30:00.000Z"
  },
  {
    id: "3",
    title: "Blue Backpack with Laptop",
    description: "Lost a blue North Face backpack containing a Dell XPS laptop, charger, and some books. The laptop has a sticker of a sunset on the cover.",
    category: "personal",
    status: "lost",
    date: "2025-05-03",
    location: {
      area: "Downtown Bus Terminal",
      city: "Chicago",
      state: "IL",
      country: "USA",
      details: "Platform 3, around 5 PM"
    },
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&q=85&w=400",
    contact: {
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      phone: "555-456-7890"
    },
    createdAt: "2025-05-04T09:15:00.000Z",
    updatedAt: "2025-05-04T09:15:00.000Z"
  },
  {
    id: "4",
    title: "Gold Ring with Ruby Stone",
    description: "Found a gold ring with a ruby stone and some engravings inside. It appears to be a wedding or engagement ring.",
    category: "accessories",
    status: "found",
    date: "2025-05-04",
    location: {
      area: "Memorial Park",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      details: "Near the jogging track"
    },
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&q=85&w=400",
    contact: {
      name: "David Chen",
      email: "david.chen@example.com"
    },
    createdAt: "2025-05-05T11:20:00.000Z",
    updatedAt: "2025-05-05T11:20:00.000Z"
  }
];

// Local storage keys
export const ITEMS_STORAGE_KEY = 'lost-found-items';

// Helper function to load items from localStorage
export const loadItems = (): Item[] => {
  try {
    const storedItems = localStorage.getItem(ITEMS_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : mockItems;
  } catch (error) {
    console.error('Error loading items from localStorage:', error);
    return mockItems;
  }
};

// Helper function to save items to localStorage
export const saveItems = (items: Item[]): void => {
  try {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items to localStorage:', error);
  }
};

// Helper function to add a new item
export const addItem = (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item => {
  const items = loadItems();
  const now = new Date().toISOString();
  
  const item: Item = {
    ...newItem,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now
  };
  
  const updatedItems = [item, ...items];
  saveItems(updatedItems);
  
  return item;
};

// Helper function to get item by id
export const getItemById = (id: string): Item | undefined => {
  const items = loadItems();
  return items.find(item => item.id === id);
};

// Helper function to update item status
export const updateItemStatus = (id: string, status: ItemStatus): Item | undefined => {
  const items = loadItems();
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) return undefined;
  
  const updatedItem = {
    ...items[itemIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  items[itemIndex] = updatedItem;
  saveItems(items);
  
  return updatedItem;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get category color class
export const getCategoryColorClass = (category: ItemCategory): string => {
  switch (category) {
    case 'electronics':
      return 'bg-category-electronics';
    case 'clothing':
      return 'bg-category-clothing';
    case 'accessories':
      return 'bg-category-accessories';
    case 'personal':
      return 'bg-category-personal';
    case 'documents':
      return 'bg-category-documents';
    case 'other':
    default:
      return 'bg-category-other';
  }
};

// Get status badge color
export const getStatusBadgeColor = (status: ItemStatus): string => {
  switch (status) {
    case 'lost':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'found':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'claimed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'returned':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Filter items based on search criteria
export interface SearchFilters {
  query?: string;
  status?: ItemStatus | 'all';
  category?: ItemCategory | 'all';
  dateFrom?: string;
  dateTo?: string;
  location?: string;
}

export const filterItems = (items: Item[], filters: SearchFilters): Item[] => {
  return items.filter(item => {
    // Text search
    if (filters.query && filters.query.trim() !== '') {
      const query = filters.query.toLowerCase();
      const matchesQuery = 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query);
      
      if (!matchesQuery) return false;
    }
    
    // Status filter
    if (filters.status && filters.status !== 'all' && item.status !== filters.status) {
      return false;
    }
    
    // Category filter
    if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }
    
    // Date range filter
    if (filters.dateFrom) {
      const dateFrom = new Date(filters.dateFrom);
      const itemDate = new Date(item.date);
      if (itemDate < dateFrom) return false;
    }
    
    if (filters.dateTo) {
      const dateTo = new Date(filters.dateTo);
      const itemDate = new Date(item.date);
      if (itemDate > dateTo) return false;
    }
    
    // Location filter
    if (filters.location && filters.location.trim() !== '') {
      const locationQuery = filters.location.toLowerCase();
      const matchesLocation = 
        item.location.area.toLowerCase().includes(locationQuery) ||
        item.location.city.toLowerCase().includes(locationQuery) ||
        (item.location.state?.toLowerCase().includes(locationQuery) ?? false) ||
        item.location.country.toLowerCase().includes(locationQuery);
      
      if (!matchesLocation) return false;
    }
    
    return true;
  });
};

export const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'personal', label: 'Personal Items' },
  { value: 'documents', label: 'Documents' },
  { value: 'other', label: 'Other' },
];

export const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'lost', label: 'Lost' },
  { value: 'found', label: 'Found' },
  { value: 'claimed', label: 'Claimed' },
  { value: 'returned', label: 'Returned' },
];
