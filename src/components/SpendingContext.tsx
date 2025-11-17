import { createContext, useState, useEffect } from "react";

export interface SpendingType {
    description: string;
    amount: number | null;
    category: string;
    date: string;
}

export const SpendingContext = createContext<{
    spendings: SpendingType[];
    setSpendings: React.Dispatch<React.SetStateAction<SpendingType[]>>;
}>({
    spendings: [],
    setSpendings: () => { },
});

export const SpendingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [spendings, setSpendings] = useState<SpendingType[]>(() => {
        const raw = localStorage.getItem("spendings");
        return raw ? JSON.parse(raw) : [];
    });

    useEffect(() => {
        localStorage.setItem("spendings", JSON.stringify(spendings));
    }, [spendings]);

    return (
        <SpendingContext.Provider value={{ spendings, setSpendings }}>
            {children}
        </SpendingContext.Provider>
    );
};
