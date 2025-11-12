import './App.scss'
import Statistics from './components/Statistics/statistics'
import AddSpending from './components/AddSpending/addSpending'
import SpendingHistory from './components/SpendingHistory/spendingHistory'
import { useState } from 'react';
import { CurrencyContext } from './components/CurrencyContext';
import { SpendingContext } from './components/CurrencyContext';


function App() {

  interface SpendingType {
    description: string;
    amount: number | null;
    category: string;
    date: string;
  }

  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "$");
  const [spendings, setSpendings] = useState<SpendingType[]>([]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <SpendingContext.Provider value={{ spendings, setSpendings }}>
        <Statistics />
        <AddSpending />
        <SpendingHistory />
      </SpendingContext.Provider>
    </CurrencyContext.Provider>
  );
}


export default App
