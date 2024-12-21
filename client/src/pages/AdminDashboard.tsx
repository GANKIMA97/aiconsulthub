import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Save } from 'lucide-react';
import { SubscriptionPlanDialog } from '@/components/SubscriptionPlanDialog';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
  isActive: boolean;
}

export function AdminDashboard() {
  const [location, setLocation] = useState(window.location);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  useEffect(() => {
    // Fetch subscription plans when component mounts
    if (adminToken) {
      fetchPlans();
    }
  }, [adminToken]);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/plans', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }

      const data = await response.json();
      setPlans(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load subscription plans',
        variant: 'destructive',
      });
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowNewPlanDialog(true);
  };

  const handleTogglePlanStatus = async (plan: Plan) => {
    try {
      const response = await fetch(`/api/admin/plans/${plan.id}/toggle-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to update plan status');
      }

      // Refresh plans after status update
      fetchPlans();
      
      toast({
        title: 'Success',
        description: `Plan ${plan.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update plan status',
        variant: 'destructive',
      });
    }
  };

  const verifyAdminAccess = async (token: string) => {
    try {
      const response = await fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Invalid admin token');
      }

      localStorage.setItem('adminToken', token);
      setAdminToken(token);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid admin token. Please try again.',
        variant: 'destructive',
      });
      localStorage.removeItem('adminToken');
      setAdminToken(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const token = formData.get('token') as string;
    await verifyAdminAccess(token);
  };

  if (!adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  name="token"
                  type="password"
                  placeholder="Enter admin token"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Admin Dashboard</CardTitle>
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  setAdminToken(null);
                }}
              >
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Website Content</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="payments">Payment Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Content management form will be added here */}
                <p className="text-muted-foreground">Content management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Blog Posts</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Blog post management will be added here */}
                <p className="text-muted-foreground">Blog management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Subscription Plans</CardTitle>
                  <Button onClick={() => setShowNewPlanDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <Card key={plan.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-lg font-bold">
                              {(plan.price / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: plan.currency
                              })}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Duration: {plan.duration} days
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPlan(plan)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleTogglePlanStatus(plan)}
                          >
                            {plan.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateway Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/visa.svg" alt="Visa" className="h-8" />
                      <div>
                        <h4 className="font-semibold">Visa</h4>
                        <p className="text-sm text-muted-foreground">Credit/Debit Card Processing</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                      <div>
                        <h4 className="font-semibold">Mastercard</h4>
                        <p className="text-sm text-muted-foreground">Credit/Debit Card Processing</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/paypal.svg" alt="PayPal" className="h-8" />
                      <div>
                        <h4 className="font-semibold">PayPal</h4>
                        <p className="text-sm text-muted-foreground">PayPal Integration</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/wechat.svg" alt="WeChat Pay" className="h-8" />
                      <div>
                        <h4 className="font-semibold">WeChat Pay</h4>
                        <p className="text-sm text-muted-foreground">WeChat Payment Integration</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/alipay.svg" alt="Alipay" className="h-8" />
                      <div>
                        <h4 className="font-semibold">Alipay</h4>
                        <p className="text-sm text-muted-foreground">Alipay Integration</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <SubscriptionPlanDialog 
          isOpen={showNewPlanDialog} 
          onClose={() => setShowNewPlanDialog(false)}
          adminToken={adminToken || ''}
          onSuccess={fetchPlans}
          plan={selectedPlan || undefined}
        />
      </div>
    </div>
  );
}