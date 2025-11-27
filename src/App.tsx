import './App.scss'
import Statistics from './components/Statistics/statistics'
import AddSpending from './components/AddSpending/addSpending'
import SpendingHistory from './components/SpendingHistory/spendingHistory'
import PieChart from './components/PieChart/pieChart'
import { useState } from 'react';
import { CurrencyProvider } from "./components/CurrencyContext";
import { SpendingProvider } from './components/SpendingContext';


function App() {

  
   

  interface SpendingType {
    description: string;
    amount: number | null;
    category: string;
    date: string;
  }

  const [currency, setCurrency] = useState(localStorage.getItem("currency") ||  localStorage.setItem('currency', '$'));
  const [spendings, setSpendings] = useState<SpendingType[]>([]);

  const savePosition = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  };

  window.addEventListener("beforeunload", savePosition);



  return (
    <CurrencyProvider value={{ currency, setCurrency }}>
      <SpendingProvider value={{ spendings, setSpendings }}>
        <Statistics />
        <AddSpending />
        <PieChart/>
        <SpendingHistory />
      </SpendingProvider>
    </CurrencyProvider>
  );
}


export default App
