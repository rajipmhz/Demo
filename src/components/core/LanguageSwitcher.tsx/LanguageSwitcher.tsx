/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { cn } from "../../../lib/utils";
import { ChevronDown, Globe } from "lucide-react";

interface LanguageSwitcherProps {
  i18n: any;
  toggleLanguage: (lang: "en" | "ne") => void;
  getTextByLanguage: (en: string, ne: string) => string;
}

export function LanguageSwitcher({ i18n, toggleLanguage, getTextByLanguage }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex items-center gap-1 rounded-md px-2 py-1 ", "hover:bg-muted focus:outline-none")}>
          <span className="text-sm font-medium text-cool-gray-800 cursor-pointer">
            {i18n.language === "en" ? "ENG" : "नेप"}
          </span>
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px] bg-white p-0">
        {/* Header */}
        <div className="flex items-center gap-1 border-b p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-oliveGreen">
            <Globe size={18} />
          </div>
          <span className="text-sm ">{getTextByLanguage("Translate to", "अनुवाद गर्नुहोस")}</span>
        </div>

        {/* English */}
        <DropdownMenuItem
          onClick={() => toggleLanguage("en")}
          className="flex items-center gap-3 px-4 py-1 cursor-pointer"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-medium text-textPrimary">EN</span>
          </div>
          <span className="text-sm">{getTextByLanguage("English", "अंग्रेजी")}</span>
        </DropdownMenuItem>

        {/* Nepali */}
        <DropdownMenuItem
          onClick={() => toggleLanguage("ne")}
          className="flex items-center gap-3 px-4 py-1 cursor-pointer"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-medium text-textPrimary">नेप</span>
          </div>
          <span className="text-sm">{getTextByLanguage("Nepali", "नेपाली")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
