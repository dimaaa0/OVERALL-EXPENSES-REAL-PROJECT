import { useState, useEffect, useContext } from 'react';
import '../Statistics/statistics.scss';
import { CurrencyContext } from '../CurrencyContext';
import { SpendingContext } from '../SpendingContext';
import wallet from '../../assets/images/wallet.svg'
import pencil from '../../assets/images/pencil.svg'


const Statistics = () => {



    const spendings = JSON.parse(localStorage.getItem('spendings') || '[]')


    // const { currency, setCurrency } = useContext(CurrencyContext);
    const { currency, setCurrency } = localStorage.getItem('currency')


    const [isInitialAmount, setIsInitialAmount] = useState(() => {
        return localStorage.getItem("amount") || "0.00";
    });




    const [enteredAmount, setEnteredAmount] = useState("0.00");

    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    const [pickedCurrency, setPickedCurrency] = useState(() => {
        return localStorage.getItem("currency") || "$";
    });
    const [currencySymbol, setCurrencySymbol] = useState(() => {
        return localStorage.getItem("currency") || "$";
    });

    const [counter, setCounter] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("spendings") || "[]");
        setCounter(saved);
    }, []);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPickedCurrency(event.target.value);
    }

    localStorage.setItem("amount", isInitialAmount);
    localStorage.setItem("currency", currencySymbol);



    const handleConfirm = () => {
        setIsInitialAmount(enteredAmount);
        setEnteredAmount("0.00");
        setCurrencySymbol(pickedCurrency);
        closeModal();
        window.location.reload();
        setCurrency(pickedCurrency);
    };

    const savedAmount = localStorage.getItem("amount") || "0.00";
    const savedCurrency = localStorage.getItem("currency") || "$";

    useEffect(() => {
        localStorage.setItem("amount", isInitialAmount);
        localStorage.setItem("currency", pickedCurrency);
    }, [isInitialAmount, pickedCurrency]);

    let total = 0;

    for (let i = 0; i < spendings.length; i++) {
        total += spendings[i].amount;
    }




    return (
        <div className="statistics">
            <div className="container">
                <div className="name">
                    <div className="image">
                        <img src={wallet} alt="React Logo" />
                    </div>
                    <div className="text">
                        <h1>Overall expenses</h1>
                        <p>Manage your finances by app</p>
                    </div>
                </div>
                <div className="total">
                    <div className="total-first"
                    >
                        <h1 className='amount'>Initial amount</h1>

                        <div className="subtotal">
                            <h1 className='value'>{savedAmount}</h1>
                            <h1 className='symbol'>{savedCurrency}</h1>
                        </div>
                        <button onClick={openModal}><img src={pencil} alt="" /></button>

                    </div>
                    <div className="total-second"
                    >
                        <h1 className='amount'>Spending</h1>

                        <div className="subtotal">
                            <h1 className='value'>{total}</h1>
                            <h1 className='symbol'>{savedCurrency}</h1>
                        </div>


                        <h1 className="overall">Amount of records: {counter.length}</h1>
                    </div>
                    <div className="total-third">
                        <h1 className='amount'>The remaining money</h1>

                        <div className="subtotal">
                            <h1 className='value'>{remainedAmount}</h1>
                            <h1 className='symbol'>{savedCurrency}</h1>
                        </div>
                    </div>
                </div>
                {isOpenModal && (

                    <div className="modal" >
                        <div className="modal-content">
                            <h1>Set your initial amount for that period</h1>
                            <div className="inputs">
                                <input className='initialAmount' type="number" value={enteredAmount} onChange={(e) => setEnteredAmount(e.target.value)} />
                                <select onChange={handleCurrencyChange}>
                                    <option value="$">$ (USD)</option>
                                    <option value="₽">₽ (RUB)</option>
                                    <option value="€">€ (EUR)</option>
                                    <option value="£">£ (GBP)</option>
                                    <option value="¥">¥ (JPY)</option>
                                    <option value="₩">₩ (KRW)</option>
                                    <option value="₹">₹ (INR)</option>
                                    <option value="$"> $ (CAD)</option>
                                    <option value="$"> $ (AUD)</option>
                                    <option value="Fr">Fr (CHF)</option>
                                    <option value="$"> $ (NZD)</option>
                                    <option value="₺">₺ (TRY)</option>
                                    <option value="R$">R$ (BRL)</option>
                                    <option value="₫">₫ (VND)</option>
                                    <option value="฿">฿ (THB)</option>
                                    <option value="₴">₴ (UAH)</option>
                                    <option value="₪">₪ (ILS)</option>
                                    <option value="د.إ">د.إ (AED)</option>
                                    <option value="₦">₦ (NGN)</option>
                                    <option value="₱">₱ (PHP)</option>
                                </select>
                            </div>
                            <div className="buttons">
                                <button
                                    onClick={closeModal}
                                >Cancel</button>
                                <button onClick={handleConfirm}>Confirm</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Statistics