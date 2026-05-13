// import React, { useCallback, useEffect, useMemo } from "react";
// import { useTranslation } from "react-i18next";

// interface Props{
//     children:React.ReactNode;
// }

// export interface ToggleContextInterface{
//     toggleLanguage:(langauage:"en"|"ne")=>void;
// }

// export const ToggleContext=React.createContext<ToggleContextInterface>({
//     toggleLanguage:()=>true,
// })

// const ToggleLanguage=(props:Props)=>{
//     const {children}=props;
//     const {i18n}=useTranslation();
//     const changeLanguage=useCallback(
//         (language:"en"|"ne")=>{
//             if(language){
//                 i18n.changeLanguage(language);
//                 localStorage.setItem(btoa(btoa("language")),language);
//                 document.documentElement.lang=language;
//             }
//         },
//         [i18n]
//     );
//     useEffect(()=>{
//         const localItem=localStorage.getItem(btoa(btoa("language")))as "en"|"ne";
//         if(localItem===null){
//             changeLanguage("ne");
//         }
//         changeLanguage(localItem);
//     },[changeLanguage])

//     const toggleOptions=useMemo(
//         ()=>({
//             toggleLanguage:changeLanguage,
//         }),
//         [changeLanguage],
//     );
//     return <ToggleContext.Provider value={toggleOptions}>{children}</ToggleContext.Provider>
// };

// export default ToggleLanguage;

import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
}

export interface ToggleContextInterface {
  toggleLanguage: (language: "en" | "ne") => void;
}

export const ToggleContext =
  React.createContext<ToggleContextInterface>({
    toggleLanguage: () => {},
  });

const LANGUAGE_LOCALE_MAP = {
  en: "en-US",
  ne: "hi-IN",
} as const;

const STORAGE_KEY = "language";

const ToggleLanguage = ({ children }: Props) => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: "en" | "ne") => {
      // change translation language
      i18n.changeLanguage(language);

      // persist selection
      localStorage.setItem(STORAGE_KEY, language);

      // set HTML lang for accessibility/SEO
      document.documentElement.lang = LANGUAGE_LOCALE_MAP[language];
    },
    [i18n]
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "en" || saved === "ne") {
      changeLanguage(saved);
    } else {
      changeLanguage("en"); // default language
    }
  }, [changeLanguage]);

  const value = useMemo(
    () => ({
      toggleLanguage: changeLanguage,
    }),
    [changeLanguage]
  );

  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleLanguage;