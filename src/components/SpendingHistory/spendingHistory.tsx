import React, { useEffect, useState, useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';
import { SpendingContext } from '../SpendingContext';
import calendar from '../../assets/images/calendar-days.svg';
import '../SpendingHistory/spendingHistory.scss';
import close from '../../assets/images/close.png'

const SpendingHistory = () => {

    const [isFood, setIsFood] = useState(false)
    const [foodAmount, setFoodAmount] = useState(0)
    const [isTransport, setIsTransport] = useState(false)
    const [transportAmount, setTransportAmount] = useState(0)
    const [isEducation, setIsEducation] = useState(false)
    const [educationAmount, setEducationAmount] = useState(0)
    const [isHealth, setIsHealth] = useState(false)
    const [healthAmount, setHealthAmount] = useState(0)
    const [isShopping, setIsShopping] = useState(false)
    const [shoppingAmount, setShoppingAmount] = useState(0)
    const [isEntertainment, setIsEntertainment] = useState(false)
    const [entertainmentAmount, setEntertainmentAmount] = useState(0)
    const [isOther, setIsOther] = useState(false)
    const [OtherAmount, setOtherAmount] = useState(0)

    const { spendings, setSpendings } = useContext(SpendingContext);
    const currency = localStorage.getItem('currency');
    const [storagedData, setStoragedData] = useState([]);

    const [hoveredIndex, setHoveredIndex] = useState(null);




    useEffect(() => {

        if (spendings && spendings.length > 0) {
            localStorage.setItem('spendings', JSON.stringify(spendings));
            setStoragedData(spendings);
        } else {
            const rawData = localStorage.getItem('spendings') || '[]';
            const saved = rawData ? JSON.parse(rawData) : [];
            setStoragedData(saved);
        }
    }, [spendings]);

    useEffect(() => {
        if (spendings.some(s => s.category == 'Food')) {
            setIsFood(true);
            let summFood = 0;
            const filteredFood = spendings.filter(a => a.category == 'Food');

            for (let i = 0; i < filteredFood.length; i++) {
                const filteredFoodAmount = filteredFood[i].amount;
                summFood += filteredFoodAmount;
                setFoodAmount(summFood)
            }
        } else {
            setIsFood(false)
        }
    }, [spendings]);






    useEffect(() => {
        if (spendings.some(s => s.category == 'Transport')) {
            setIsTransport(true);
            let summTransport = 0;
            const filteredTransport = spendings.filter(a => a.category == 'Transport');

            for (let i = 0; i < filteredTransport.length; i++) {
                const filteredTransportAmount = filteredTransport[i].amount;
                summTransport += filteredTransportAmount;
                setTransportAmount(summTransport)
            }
        } else {
            setIsTransport(false)
        }
    }, [spendings]);

    useEffect(() => {
        if (spendings.some(s => s.category == 'Education')) {
            setIsEducation(true);
            let summEducation = 0;
            const filteredEducation = spendings.filter(a => a.category == 'Education');

            for (let i = 0; i < filteredEducation.length; i++) {
                const filteredEducationAmount = filteredEducation[i].amount;
                summEducation += filteredEducationAmount;
                setEducationAmount(summEducation)
            }
        } else {
            setIsEducation(false)
        }
    }, [spendings]);

    useEffect(() => {
        if (spendings.some(s => s.category == 'Health')) {
            setIsHealth(true);
            let summHealth = 0;
            const filteredHealth = spendings.filter(a => a.category == 'Health');

            for (let i = 0; i < filteredHealth.length; i++) {
                const filteredHealthAmount = filteredHealth[i].amount;
                summHealth += filteredHealthAmount;
                setHealthAmount(summHealth)
            }
        } else {
            setIsHealth(false)
        }
    }, [spendings]);

    useEffect(() => {
        if (spendings.some(s => s.category == 'Shopping')) {
            setIsShopping(true);
            let summShopping = 0;
            const filteredShopping = spendings.filter(a => a.category == 'Shopping');

            for (let i = 0; i < filteredShopping.length; i++) {
                const filteredShoppingAmount = filteredShopping[i].amount;
                summShopping += filteredShoppingAmount;
                setShoppingAmount(summShopping)
            }
        } else {
            setIsShopping(false)
        }
    }, [spendings]);

    useEffect(() => {
        if (spendings.some(s => s.category == 'Entertainment')) {
            setIsEntertainment(true);
            let summEntertainment = 0;
            const filteredEntertainment = spendings.filter(a => a.category == 'Entertainment');

            for (let i = 0; i < filteredEntertainment.length; i++) {
                const filteredEntertainmentAmount = filteredEntertainment[i].amount;
                summEntertainment += filteredEntertainmentAmount;
                setEntertainmentAmount(summEntertainment)
            }
        } else {
            setIsEntertainment(false)
        }
    }, [spendings]);

    useEffect(() => {
        if (spendings.some(s => s.category == 'Other')) {
            setIsOther(true);
            let summOther = 0;
            const filteredOther = spendings.filter(a => a.category == 'Other');

            for (let i = 0; i < filteredOther.length; i++) {
                const filteredOtherAmount = filteredOther[i].amount;
                summOther += filteredOtherAmount;
                setOtherAmount(summOther)
            }
        } else {
            setIsOther(false)
        }
    }, [spendings]);

    const categories = [
        { shownItem: isFood, name: 'Food', amount: foodAmount, className: 'food', visible: false },
        { shownItem: isTransport, name: 'Transport', amount: transportAmount, className: 'transport', visible: false },
        { shownItem: isEducation, name: 'Education', amount: educationAmount, className: 'education', visible: false },
        { shownItem: isHealth, name: 'Health', amount: healthAmount, className: 'health', visible: false },
        { shownItem: isShopping, name: 'Shopping', amount: shoppingAmount, className: 'shopping', visible: false },
        { shownItem: isEntertainment, name: 'Entertainment', amount: entertainmentAmount, className: 'entertainment', visible: false },
        { shownItem: isOther, name: 'Other', amount: OtherAmount, className: 'other', visible: false },
    ]

    for (let i = 0; i < categories.length; i++) {
        if (categories[i].amount > 0) {
            categories[i].visible = true
        } else {
            categories[i].visible = false
        }

    }

    const sortedCategories = categories.sort((a, b) => b.amount - a.amount)


    const handleDelete = (id) => {
        const newList = spendings.filter(item => item.id !== id);
        setSpendings(newList);
        localStorage.setItem("spendings", JSON.stringify(newList));
        window.location.reload()
    };

    const handleHover = (index) => {
        setHoveredIndex(index);
    };

    const handleCancelHover = () => {
        setHoveredIndex(null);
    };

    const filteredCaregories = sortedCategories.includes


    return (
        <div className="storage">
            <div className="container">
                <div className="byCategories">
                    <div className="byCategories-content">
                        <h2 className="title">Spending by Categories</h2>
                        <div className="line-data">
                            {sortedCategories.map((cat) => (
                                <div className="line"
                                    key={cat.name}
                                    style={{
                                        display: cat.visible ? 'block' : 'none'
                                    }}
                                >
                                    <div className="info">
                                        <h3 className='name'>{cat.name}</h3>
                                        <h3 className='expenses'>{cat.amount} {currency}</h3>
                                    </div>
                                    <div className={`line-content ${cat.className}`}>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="spendingHistory">
                    <div className="spendingHistory-content">
                        <h2 className='spendingHistoryName'>Spending History</h2>

                        {storagedData.length > 0 ? (
                            <div className="spending-list">
                                <ul>
                                    {[...spendings].reverse().map((item) => (
                                        <li
                                            key={item.id}
                                            onMouseEnter={() => handleHover(item.id)}
                                            onMouseLeave={handleCancelHover}
                                        >
                                            {hoveredIndex === item.id && (
                                                <img
                                                    className='close'
                                                    src={close}
                                                    onClick={() => handleDelete(item.id)}
                                                />
                                            )}
                                            <div
                                                className="line"
                                                style={{
                                                    backgroundColor:
                                                        item.category === 'Food'
                                                            ? '#77eb67b2'
                                                            : item.category === 'Transport'
                                                                ? '#36a3ebb2'
                                                                : item.category === 'Education'
                                                                    ? '#e93737b4'
                                                                    : item.category === 'Health'
                                                                        ? '#fa66ffb9'
                                                                        : item.category === 'Shopping'
                                                                            ? '#ffa040ce'
                                                                            : item.category === 'Entertainment'
                                                                                ? '#ffee00ff'
                                                                                : item.category === 'Other'
                                                                                    ? '#380e8691'
                                                                                    : '#CCCCCC',
                                                }}
                                            ></div>

                                            <div className="info">
                                                <h5 className="description">{item.description}</h5>
                                                <div className="data">
                                                    <h5
                                                        className="categoryName"
                                                        style={{
                                                            color:
                                                                item.category === 'Food'
                                                                    ? '#77eb67b2'
                                                                    : item.category === 'Transport'
                                                                        ? '#36a3ebb2'
                                                                        : item.category === 'Education'
                                                                            ? '#e93737b4'
                                                                            : item.category === 'Health'
                                                                                ? '#fa66ffb9'
                                                                                : item.category === 'Shopping'
                                                                                    ? '#ffa040ce'
                                                                                    : item.category === 'Entertainment'
                                                                                        ? '#bbb12cc4'
                                                                                        : item.category === 'Other'
                                                                                            ? '#380e8691'
                                                                                            : '#CCCCCC',
                                                        }}
                                                    >
                                                        {item.category}
                                                    </h5>
                                                    <h5 className="date">
                                                        <img src={calendar} alt="" />
                                                        <span>{item.date}</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="amount">
                                                {item.amount} {currency}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No spendings yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpendingHistory;