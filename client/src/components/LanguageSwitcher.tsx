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
          className="min-w-[80px] bg-transparent border-0 shadow-none focus:ring-0 hover:bg-transparent" 
          hideIndicator
        >
          <span className="text-sm text-foreground/70">
            {languages.find(lang => lang.code === i18n.language)?.name || i18n.language.toUpperCase()}
          </span>
        </SelectTrigger>
        <SelectContent 
          align="end"
          className="min-w-[100px] bg-white/95 shadow-sm rounded border-0"
          position="popper"
          side="bottom"
          sideOffset={4}
        >
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="py-1.5 px-2 text-sm cursor-pointer hover:bg-gray-50"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
