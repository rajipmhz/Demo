import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ne } from "./trans";

export const geti18nLanguage=(language:string)=>{
    try{
        return atob(atob(localStorage.getItem(btoa(btoa(language)))??""))
    }catch(e){
        return "";
    }
};

const resources={
    en,
    ne
}


const nepaliCount = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: geti18nLanguage("language") ?? "ne",
    fallbackLng: "ne",
    defaultNS: "common",

    keySeparator: ".", // we use keys in form ('messages.welcome')

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

/**
 * Returns data in selected language
 * @param dataEn any data containing english language
 * @param dataNe any data containing nepali language
 */
export function getTextByLanguage<T, U>(languageEn: T, languageNe: U): T | U {
  if (i18n.language === "ne") {
    return languageNe;
  }
  return languageEn;
}

/**
 * Converts english number to nepali number as string
 * @param numberEn number in english
 */
export const convertEngToNepNumber = (numberEn: string | number | undefined) => {
  // eslint-disable-next-line eqeqeq
  if (!numberEn && numberEn != 0) return "";
  return (typeof numberEn === "string" ? numberEn : numberEn.toString())
    .split("")
    .map((number) => (nepaliCount[+number] ? nepaliCount[+number] : number))
    .join("");
};

export default i18n;
