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
        <SelectTrigger 
          className="min-w-[70px] h-9 px-2.5 bg-transparent border-none focus:ring-0" 
          hideIndicator
        >
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">
              {i18n.language.toUpperCase()}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent 
          align="end"
          alignOffset={-2}
          className="min-w-[120px] bg-background/95 shadow-md rounded-md border-0"
          position="popper"
          side="bottom"
          sideOffset={6}
        >
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="py-2 px-3 text-sm cursor-pointer hover:bg-accent/5"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
