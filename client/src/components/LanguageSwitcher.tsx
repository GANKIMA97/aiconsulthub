import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
  ];

  return (
    <div className="relative z-50">
      <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
        <SelectTrigger className="min-w-[100px] sm:w-[120px] h-9 px-2.5 bg-transparent hover:bg-background/10 border-none focus:ring-0 rounded-md text-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 shrink-0 text-foreground/70" />
            <SelectValue className="flex-1" />
          </div>
        </SelectTrigger>
        <SelectContent 
          align="end" 
          className="w-[180px] bg-background/95 backdrop-blur-md shadow-lg border border-border/50"
          position="popper"
          side="bottom"
          sideOffset={4}
        >
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="py-2.5 px-3 text-sm cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
