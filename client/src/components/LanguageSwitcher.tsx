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
          className="min-w-[100px] flex items-center gap-2 bg-transparent border-0 shadow-none focus:ring-0 hover:bg-transparent" 
          hideIndicator
        >
          <Globe className="h-4 w-4 text-foreground/70" />
          <span className="text-sm text-foreground/70">
            {languages.find(lang => lang.code === i18n.language)?.name || i18n.language.toUpperCase()}
          </span>
        </SelectTrigger>
        <SelectContent 
          align="end"
          className="min-w-[120px] bg-white/95 shadow-sm rounded-lg border-0 p-1"
          position="popper"
          side="bottom"
          sideOffset={4}
        >
          <div className="flex flex-col">
            {languages.map((lang) => (
              <SelectItem 
                key={lang.code} 
                value={lang.code}
                className="py-2 px-3 text-sm cursor-pointer rounded-md hover:bg-gray-50 transition-colors"
              >
                {lang.name}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
