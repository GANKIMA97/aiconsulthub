import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lock, Bookmark } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@db/schema';

export function Blog() {
  const { t, i18n } = useTranslation();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/posts', i18n.language],
  });

  return (
    <div className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            {t('blog.premiumContent')}
          </h1>
          <p className="text-muted-foreground">
            {t('blog.subscribe')}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-background/30 backdrop-blur-lg animate-pulse">
                <CardHeader className="h-48" />
                <CardContent className="space-y-2">
                  <div className="h-4 bg-primary/20 rounded" />
                  <div className="h-4 bg-primary/20 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="relative overflow-hidden bg-background/30 backdrop-blur-lg border-primary/20 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      {post.isPremium && (
                        <Badge variant="default" className="bg-primary/80">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.isPremium ? t('blog.locked') : post.content}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      {post.isPremium ? t('blog.subscribe') : 'Read More'}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
