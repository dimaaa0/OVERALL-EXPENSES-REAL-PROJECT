import { createContext, useState, ReactNode } from "react";

interface CurrencyContextType {
    currency: string;
    setCurrency: (c: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
    currency: "$",
    setCurrency: () => { },
});

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState("$");

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};