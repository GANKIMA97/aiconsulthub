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
        <SelectTrigger className="min-w-[40px] w-auto px-2 h-8 bg-transparent hover:bg-transparent border-0 shadow-none focus:ring-0 focus:border-0">
          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium opacity-70">
              {i18n.language.toUpperCase()}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent 
          align="end"
          alignOffset={-4}
          className="min-w-[100px] rounded-md bg-background/80 backdrop-blur-sm shadow-sm border-0"
          position="popper"
          side="bottom"
          sideOffset={8}
        >
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="py-1.5 px-2 text-sm cursor-pointer hover:bg-primary/5 focus:bg-primary/5"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
