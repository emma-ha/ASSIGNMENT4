/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credits) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credits.date.slice(0,10);
      return <li key={credits.id}>{credits.amount} {credits.description} {date}</li>
    }) 
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    props.addCredit({ amount: e.target.amount.value, date: new Date().toISOString(),
      description: e.target.description.value,}); //add to list
  }
  return (
    <div>
      <h1>Credits</h1> 

      {creditsView()}

      <form onSubmit={e => {handleSubmit(e)} }>
        <input type="text" name="description" />
        <input type="number" name="amount" step ="0.01"/>
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <AccountBalance accountBalance={props.accountBalance}/> 
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;