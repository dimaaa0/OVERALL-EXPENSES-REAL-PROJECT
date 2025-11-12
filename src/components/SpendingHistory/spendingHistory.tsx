import React, { useEffect } from 'react'
import { useContext } from 'react';
import { SpendingContext } from '../CurrencyContext';
import { CurrencyContext } from '../CurrencyContext';
import '../SpendingHistory/spendingHistory.scss';
import calendar from '../../assets/images/calendar-days.svg'

const SpendingHistory = () => {
    const { spendings } = useContext(SpendingContext);
    const { currency } = useContext(CurrencyContext);


    useEffect(() => {
        console.log('Spendings in SpendingHistory:', spendings);
    }, [spendings]);

    return (
        <div className="storage">
            <div className="container">
                <div className="byCategories">
                    <div className="byCategories-content">
                        <h2 className='title'>Spending by Categories</h2>
                    </div>
                </div>
                <div className="spendingHistory">
                    <div className="spendingHistory-content">
                        <h2>Spending History</h2>
                        {spendings.length > 0 ? (
                            <div className="spending-list">
                                <ul>
                                    {spendings.map((item, index) => (
                                        <li key={index}>
                                            <div className="line"
                                                style={{
                                                    backgroundColor: item.category === 'Food' ? '#77eb67b2' :
                                                        item.category === 'Transport' ? '#36a3ebb2' :
                                                            item.category === 'Education' ? '#e93737b4' :
                                                                item.category === 'Health' ? '#fa66ffb9' :
                                                                    item.category === 'Shopping' ? '#ffa040ce' :
                                                                        item.category === 'Entertainment' ? '#ffee00ff' :
                                                                            item.category === 'Other' ? '#380e8691' :
                                                                                '#CCCCCC'
                                                }}
                                            ></div>
                                            <div className="info">
                                                <div className="line"></div>
                                                <h5 className='description'>{item.description}</h5>
                                                <div className="data">
                                                    <h5 className='category'
                                                        style={{
                                                            color: item.category === 'Food' ? '#77eb67b2' :
                                                                item.category === 'Transport' ? '#36a3ebb2' :
                                                                    item.category === 'Education' ? '#e93737b4' :
                                                                        item.category === 'Health' ? '#fa66ffb9' :
                                                                            item.category === 'Shopping' ? '#ffa040ce' :
                                                                                item.category === 'Entertainment' ? '#bbb12cc4' :
                                                                                    item.category === 'Other' ? '#380e8691' :
                                                                                        '#CCCCCC',
                                                            backgroundColor: item.category === 'Food' ? '#76eb6733' :
                                                                item.category === 'Transport' ? '#36a3eb2f' :
                                                                    item.category === 'Education' ? 'rgba(233, 55, 55, 0.19)' :
                                                                        item.category === 'Health' ? '#fa66ff2a' :
                                                                            item.category === 'Shopping' ? '#ffa0401c' :
                                                                                item.category === 'Entertainment' ? '#cec54d21' :
                                                                                    item.category === 'Other' ? '#380e8625' :
                                                                                        '#CCCCCC'
                                                        }}>{item.category}</h5>
                                                    <h5 className='date'><img src={calendar} alt="" />{item.date}</h5>
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

export default SpendingHistory