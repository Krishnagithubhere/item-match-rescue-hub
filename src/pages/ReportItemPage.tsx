
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useItems } from "@/contexts/ItemsContext";
import { ItemFormData } from "@/types/item";
import { categoryOptions } from "@/utils/itemUtils";

const ReportItemPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { addNewItem } = useItems();
  
  const [formData, setFormData] = useState<ItemFormData>({
    title: "",
    description: "",
    category: "other",
    status: type === "lost" ? "lost" : "found",
    date: format(new Date(), "yyyy-MM-dd"),
    location: {
      area: "",
      city: "",
      country: "",
      details: "",
    },
    contact: {
      name: "",
      email: "",
      phone: "",
    },
    image: null,
  });

  const [date, setDate] = useState<Date>(new Date());
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (name: string, value: string) => {
    const [section, field] = name.split(".");
    
    if (field) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for the field if exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormData(prev => ({
        ...prev,
        date: format(selectedDate, "yyyy-MM-dd")
      }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files ? e.target.files[0] : null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors['title'] = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors['description'] = 'Description is required';
    }
    
    if (!formData.location.area.trim()) {
      newErrors['location.area'] = 'Area is required';
    }
    
    if (!formData.location.city.trim()) {
      newErrors['location.city'] = 'City is required';
    }
    
    if (!formData.location.country.trim()) {
      newErrors['location.country'] = 'Country is required';
    }
    
    if (!formData.contact.name.trim()) {
      newErrors['contact.name'] = 'Your name is required';
    }
    
    if (!formData.contact.email.trim()) {
      newErrors['contact.email'] = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contact.email.trim())) {
      newErrors['contact.email'] = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // For this demo, we'll simulate image upload by using a sample image URL based on category
    let imageUrl;
    switch (formData.category) {
      case 'electronics':
        imageUrl = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&q=85&w=400';
        break;
      case 'accessories':
        imageUrl = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&q=85&w=400';
        break;
      case 'personal':
        imageUrl = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&q=85&w=400';
        break;
      default:
        imageUrl = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&q=85&w=400';
    }
    
    // Add the new item
    const newItem = addNewItem({
      ...formData,
      image: imageUrl
    });
    
    // Redirect to the item detail page
    navigate(`/items/${newItem.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => navigate(-1)} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                Report a {type === "lost" ? "Lost" : "Found"} Item
              </h1>
              <p className="text-muted-foreground mt-2">
                Please provide as much detail as possible to help {type === "lost" ? "locate your item" : "return this item to its owner"}.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Item Details</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className={cn(errors.title && "text-destructive")}>
                    Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="E.g., Black Leather Wallet, iPhone 13 Pro"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={cn(errors.title && "border-destructive")}
                  />
                  {errors.title && (
                    <p className="text-destructive text-sm">{errors.title}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className={cn(errors.description && "text-destructive")}>
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Include identifying details, contents, condition, etc."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={cn("min-h-[120px]", errors.description && "border-destructive")}
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm">{errors.description}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.filter(option => option.value !== 'all').map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date {type === "lost" ? "Lost" : "Found"} *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                          disabled={(date) => date > new Date()}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image (Optional)</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    A clear image helps with identification (Max size: 5MB)
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Location Details</h2>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="location.area"
                    className={cn(errors["location.area"] && "text-destructive")}
                  >
                    Area/Neighborhood *
                  </Label>
                  <Input
                    id="location.area"
                    placeholder="E.g., Downtown, Central Park, Shopping Mall"
                    value={formData.location.area}
                    onChange={(e) => handleChange("location.area", e.target.value)}
                    className={cn(errors["location.area"] && "border-destructive")}
                  />
                  {errors["location.area"] && (
                    <p className="text-destructive text-sm">{errors["location.area"]}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="location.city"
                      className={cn(errors["location.city"] && "text-destructive")}
                    >
                      City *
                    </Label>
                    <Input
                      id="location.city"
                      placeholder="E.g., New York"
                      value={formData.location.city}
                      onChange={(e) => handleChange("location.city", e.target.value)}
                      className={cn(errors["location.city"] && "border-destructive")}
                    />
                    {errors["location.city"] && (
                      <p className="text-destructive text-sm">{errors["location.city"]}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location.state">State/Province (Optional)</Label>
                    <Input
                      id="location.state"
                      placeholder="E.g., NY, California"
                      value={formData.location.state || ""}
                      onChange={(e) => handleChange("location.state", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="location.country"
                    className={cn(errors["location.country"] && "text-destructive")}
                  >
                    Country *
                  </Label>
                  <Input
                    id="location.country"
                    placeholder="E.g., USA, Canada"
                    value={formData.location.country}
                    onChange={(e) => handleChange("location.country", e.target.value)}
                    className={cn(errors["location.country"] && "border-destructive")}
                  />
                  {errors["location.country"] && (
                    <p className="text-destructive text-sm">{errors["location.country"]}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location.details">Specific Location Details (Optional)</Label>
                  <Textarea
                    id="location.details"
                    placeholder="E.g., Near the fountain in the park, inside the coffee shop"
                    value={formData.location.details || ""}
                    onChange={(e) => handleChange("location.details", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Contact Information</h2>
                <p className="text-sm text-muted-foreground">
                  This information will be used to contact you if someone {type === "lost" ? "finds your item" : "claims this item"}.
                  Your email will only be shared when you connect with a {type === "lost" ? "finder" : "owner"}.
                </p>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="contact.name"
                    className={cn(errors["contact.name"] && "text-destructive")}
                  >
                    Your Name *
                  </Label>
                  <Input
                    id="contact.name"
                    placeholder="Full Name"
                    value={formData.contact.name}
                    onChange={(e) => handleChange("contact.name", e.target.value)}
                    className={cn(errors["contact.name"] && "border-destructive")}
                  />
                  {errors["contact.name"] && (
                    <p className="text-destructive text-sm">{errors["contact.name"]}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="contact.email"
                    className={cn(errors["contact.email"] && "text-destructive")}
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="contact.email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.contact.email}
                    onChange={(e) => handleChange("contact.email", e.target.value)}
                    className={cn(errors["contact.email"] && "border-destructive")}
                  />
                  {errors["contact.email"] && (
                    <p className="text-destructive text-sm">{errors["contact.email"]}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact.phone">Phone Number (Optional)</Label>
                  <Input
                    id="contact.phone"
                    type="tel"
                    placeholder="E.g., 555-123-4567"
                    value={formData.contact.phone || ""}
                    onChange={(e) => handleChange("contact.phone", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Submit {type === "lost" ? "Lost" : "Found"} Item Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportItemPage;
