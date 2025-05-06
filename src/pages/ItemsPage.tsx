
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { ItemCard } from "@/components/ItemCard";
import { useItems } from "@/contexts/ItemsContext";
import { filterItems, SearchFilters as FilterType } from "@/utils/itemUtils";

const ItemsPage = () => {
  const { items } = useItems();
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeFilters, setActiveFilters] = useState<FilterType>({});

  const handleSearch = (filters: FilterType) => {
    setActiveFilters(filters);
    const results = filterItems(items, filters);
    setFilteredItems(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Browse Lost & Found Items</h1>
          
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} />
          </div>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search filters or report a new item.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemsPage;
