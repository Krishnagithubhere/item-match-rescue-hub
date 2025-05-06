
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, getCategoryColorClass, getStatusBadgeColor } from "@/utils/itemUtils";
import { useItems } from "@/contexts/ItemsContext";
import { Calendar, MapPin, Mail, ArrowLeft } from "lucide-react";
import { ItemStatus } from "@/types/item";

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, getItem, updateStatus } = useItems();
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const item = id ? getItem(id) : undefined;
  
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStatusUpdate = (status: ItemStatus) => {
    if (id) {
      updateStatus(id, status);
    }
  };

  const handleSendMessage = () => {
    // Here we would normally send the message to the backend
    // For now, we'll just show a success message
    setMessage("");
    setDialogOpen(false);
    alert("Your message has been sent! The owner will contact you soon.");
  };

  const statusClass = getStatusBadgeColor(item.status);
  const categoryClass = getCategoryColorClass(item.category);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => navigate(-1)} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Items
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="overflow-hidden rounded-xl border bg-card">
                {item.image ? (
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`aspect-video ${categoryClass} flex items-center justify-center`}>
                    <span className="text-gray-600 text-2xl font-semibold capitalize">{item.category}</span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className={statusClass}>{item.status}</Badge>
                    <Badge variant="outline" className={categoryClass}>{item.category}</Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Lost/Found on {formatDate(item.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {item.location.area}, {item.location.city}
                        {item.location.state && `, ${item.location.state}`}, {item.location.country}
                      </span>
                    </div>
                    {item.location.details && (
                      <div className="text-sm ml-6 text-muted-foreground">
                        "{item.location.details}"
                      </div>
                    )}
                  </div>
                  
                  {item.status === 'lost' && (
                    <div className="mt-6 space-y-3">
                      <p className="text-sm text-muted-foreground">Update status:</p>
                      <Button 
                        onClick={() => handleStatusUpdate('claimed')}
                        variant="outline"
                        className="w-full"
                      >
                        Mark as Claimed (I found it)
                      </Button>
                    </div>
                  )}
                  
                  {item.status === 'found' && (
                    <div className="mt-6 space-y-3">
                      <p className="text-sm text-muted-foreground">Update status:</p>
                      <Button 
                        onClick={() => handleStatusUpdate('claimed')}
                        variant="outline"
                        className="w-full"
                      >
                        Mark as Claimed (This is mine)
                      </Button>
                    </div>
                  )}
                  
                  {item.status === 'claimed' && (
                    <div className="mt-6 space-y-3">
                      <p className="text-sm text-muted-foreground">Update status:</p>
                      <Button 
                        onClick={() => handleStatusUpdate('returned')}
                        variant="default"
                        className="w-full"
                      >
                        Mark as Returned
                      </Button>
                    </div>
                  )}
                  
                  {item.status === 'returned' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg text-center text-green-800">
                      <p className="font-medium">This item has been returned to its owner!</p>
                      <p className="text-sm mt-1">Thank you for using ReuniteHub.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <p className="text-muted-foreground">
                    Posted on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{item.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Posted By</h2>
                  <div className="p-4 rounded-lg bg-card border">
                    <div className="space-y-2">
                      <p className="font-medium">{item.contact.name}</p>
                      
                      {item.status !== 'returned' && (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full mt-2">
                              <Mail className="mr-2 h-4 w-4" />
                              Contact {item.status === 'lost' ? 'Owner' : 'Finder'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Contact {item.contact.name}</DialogTitle>
                              <DialogDescription>
                                Send a message about this {item.status === 'lost' ? 'lost' : 'found'} item. Your email will be shared when you send this message.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                                <Textarea
                                  id="message"
                                  placeholder={`Hello, I'm writing about your ${item.status} item...`}
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  className="min-h-[120px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleSendMessage} disabled={!message.trim()}>Send Message</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">Safety Tips</h2>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Always meet in a public place during daylight hours</li>
                    <li>Bring a friend or family member with you if possible</li>
                    <li>Ask for specific details about the item to verify ownership</li>
                    <li>For valuable items, request proof of ownership</li>
                    <li>Trust your instincts and prioritize your safety</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemDetailPage;
