import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props{
    children:React.ReactNode;
}

export interface ToggleContextInterface{
    toggleLanguage:(langauage:"en"|"ne")=>void;
}

export const ToggleContext=React.createContext<ToggleContextInterface>({
    toggleLanguage:()=>true,
})

const ToggleLanguage=(props:Props)=>{
    const {children}=props;
    const {i18n}=useTranslation();
    const changeLanguage=useCallback(
        (language:"en"|"ne")=>{
            if(language){
                i18n.changeLanguage(language);
                localStorage.setItem(btoa(btoa("language")),language);
                document.documentElement.lang=language;
            }
        },
        [i18n]
    );
    useEffect(()=>{
        const localItem=localStorage.getItem(btoa(btoa("language")))as "en"|"ne";
        if(localItem===null){
            changeLanguage("ne");
        }
        changeLanguage(localItem);
    },[changeLanguage])

    const toggleOptions=useMemo(
        ()=>({
            toggleLanguage:changeLanguage,
        }),
        [changeLanguage],
    );
    return <ToggleContext.Provider value={toggleOptions}>{children}</ToggleContext.Provider>
};

export default ToggleLanguage;