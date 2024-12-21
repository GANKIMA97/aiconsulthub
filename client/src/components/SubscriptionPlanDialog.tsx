import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  duration: z.coerce.number().positive('Duration must be positive'),
  features: z.array(z.string()),
});

type FormData = z.infer<typeof formSchema>;

interface Plan {
  id?: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
  isActive: boolean;
}

interface SubscriptionPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: Plan;
  adminToken: string;
  onSuccess: () => void;
}

export function SubscriptionPlanDialog({
  isOpen,
  onClose,
  plan,
  adminToken,
  onSuccess,
}: SubscriptionPlanDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [featureInput, setFeatureInput] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: plan?.name ?? '',
      description: plan?.description ?? '',
      price: plan?.price ? plan.price / 100 : undefined,
      currency: plan?.currency ?? 'USD',
      duration: plan?.duration ?? 30,
      features: plan?.features ?? [],
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const endpoint = plan ? `/api/admin/plans/${plan.id}` : '/api/admin/plans';
      const method = plan ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          ...data,
          price: Math.round(data.price * 100), // Convert to cents
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      toast({
        title: 'Success',
        description: `Plan ${plan ? 'updated' : 'created'} successfully`,
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const currentFeatures = form.getValues('features');
    form.setValue('features', [...currentFeatures, featureInput.trim()]);
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    const currentFeatures = form.getValues('features');
    form.setValue('features', currentFeatures.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {plan ? 'Edit Subscription Plan' : 'Create New Plan'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        placeholder="Add a feature"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={handleAddFeature}
                        disabled={isLoading}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.watch('features').map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-accent rounded-md"
                        >
                          <span className="text-sm">{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFeature(index)}
                            disabled={isLoading}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {plan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
