
import { useState } from 'react';
import { SearchFilters as FilterType } from '@/utils/itemUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Search, X } from 'lucide-react';
import { categoryOptions, statusOptions } from '@/utils/itemUtils';
import { format } from 'date-fns';

interface SearchFiltersProps {
  onSearch: (filters: FilterType) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterType>({
    query: '',
    status: 'all',
    category: 'all',
    location: '',
    dateFrom: '',
    dateTo: '',
  });

  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const handleChange = (name: keyof FilterType, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFromDateChange = (date: Date | undefined) => {
    setFromDate(date);
    if (date) {
      setFilters(prev => ({ ...prev, dateFrom: format(date, 'yyyy-MM-dd') }));
    } else {
      setFilters(prev => ({ ...prev, dateFrom: '' }));
    }
  };

  const handleToDateChange = (date: Date | undefined) => {
    setToDate(date);
    if (date) {
      setFilters(prev => ({ ...prev, dateTo: format(date, 'yyyy-MM-dd') }));
    } else {
      setFilters(prev => ({ ...prev, dateTo: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setFilters({
      query: '',
      status: 'all',
      category: 'all',
      location: '',
      dateFrom: '',
      dateTo: '',
    });
    onSearch({
      status: 'all',
      category: 'all',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for lost or found items..."
            className="pl-10"
            value={filters.query || ''}
            onChange={(e) => handleChange('query', e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
          className="p-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => handleChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) => handleChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          placeholder="Location (city, area)"
          value={filters.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
        />
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, 'MMM dd, yyyy') : 'From Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={handleFromDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, 'MMM dd, yyyy') : 'To Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={handleToDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </form>
  );
}
