import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  type: 'message' | 'system';
  content: string;
  sender?: string;
  timestamp: number;
}

export function ChatWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY = 2000; // 2 seconds

    const connect = () => {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      socket = new WebSocket(`${wsProtocol}//${window.location.host}/ws/chat`);

      socket.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttempts = 0; // Reset attempts on successful connection
        toast({
          title: "Connected",
          description: "Chat service connected successfully.",
          duration: 2000,
        });
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages((prev) => [...prev, message]);
          
          // Scroll to bottom on new message
          if (scrollAreaRef.current) {
            setTimeout(() => {
              scrollAreaRef.current?.scrollTo({ 
                top: scrollAreaRef.current.scrollHeight, 
                behavior: 'smooth' 
              });
            }, 100);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      socket.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        
        // Only attempt to reconnect if we haven't reached max attempts
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          toast({
            title: "Connection Lost",
            description: "Attempting to reconnect...",
            duration: 3000,
          });
          
          reconnectTimeout = setTimeout(() => {
            reconnectAttempts++;
            connect();
          }, RECONNECT_DELAY * Math.min(reconnectAttempts + 1, 5));
        } else {
          toast({
            title: "Connection Failed",
            description: "Unable to establish connection. Please refresh the page to try again.",
            variant: "destructive",
          });
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Let onclose handle the reconnection
      };

      setWs(socket);
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
      clearTimeout(reconnectTimeout);
    };
  }, [toast]);

  const sendMessage = () => {
    if (!inputValue.trim() || !ws) return;

    const message: Message = {
      type: 'message',
      content: inputValue,
      sender: 'user',
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(message));
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background border border-border rounded-lg shadow-lg w-80 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-3 border-b border-border flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="font-medium">Chat Support</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7"
                  onClick={() => setIsOpen(false)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        duration: 0.3
                      }}
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-lg px-4 py-2 max-w-[80%] transform-gpu ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.type === 'system'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {message.content}
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <motion.div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full transition-all duration-200 focus:shadow-md"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    size="icon" 
                    onClick={sendMessage}
                    className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                  >
                    <motion.div
                      animate={{ x: inputValue ? [0, 2, 0] : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              className="rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={() => setIsOpen(true)}
            >
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
              </motion.div>
              Chat Support
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
