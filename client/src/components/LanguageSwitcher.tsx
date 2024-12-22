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
        <SelectTrigger className="min-w-[32px] h-8 px-1.5 bg-transparent border-0 shadow-none ring-0 hover:bg-transparent focus:ring-0">
          <div className="flex items-center gap-1">
            <Globe className="h-[14px] w-[14px] text-foreground/60" />
            <span className="text-xs font-medium text-foreground/60">
              {i18n.language.toUpperCase()}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent 
          align="end"
          alignOffset={-2}
          className="min-w-[90px] bg-background/95 shadow-md rounded-md border-0"
          position="popper"
          side="bottom"
          sideOffset={6}
        >
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="py-1 px-2 text-xs cursor-pointer hover:bg-accent/5"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
