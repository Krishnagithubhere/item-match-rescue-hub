
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item, ItemStatus } from '@/types/item';
import { loadItems, saveItems, addItem, updateItemStatus } from '@/utils/itemUtils';
import { useToast } from '@/hooks/use-toast';

interface ItemsContextType {
  items: Item[];
  addNewItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => Item;
  updateStatus: (id: string, status: ItemStatus) => Item | undefined;
  getItem: (id: string) => Item | undefined;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const { toast } = useToast();

  // Load items from localStorage on initial render
  useEffect(() => {
    const loadedItems = loadItems();
    setItems(loadedItems);
  }, []);

  const addNewItem = (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item = addItem(newItem);
    setItems(prevItems => [item, ...prevItems]);
    toast({
      title: 'Item Added',
      description: `Your ${newItem.status === 'lost' ? 'lost' : 'found'} item has been posted successfully.`,
    });
    return item;
  };

  const updateStatus = (id: string, status: ItemStatus) => {
    const updatedItem = updateItemStatus(id, status);
    if (updatedItem) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? updatedItem : item
        )
      );
      toast({
        title: 'Status Updated',
        description: `Item status has been updated to ${status}.`,
      });
    }
    return updatedItem;
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <ItemsContext.Provider value={{ items, addNewItem, updateStatus, getItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
