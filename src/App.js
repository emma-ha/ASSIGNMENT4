/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  
    super(); 
    this.state = {
      accountBalance: 0.00,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    }
  }

  async componentDidMount() 
  {
    let totalDebit = 0;
    let totalCredit = 0;
    let API = 'https://johnnylaicode.github.io/api/'; //API link
    try 
    {
      let cAPI = await axios.get(API + 'credits.json');
      let dAPI = await axios.get(API + 'debits.json'); 
      this.setState({credits: cAPI.data}); //data into list
      this.setState({debits: dAPI.data}); //data into list
    }
    catch (error) //error handling 
    {
      if (error.cAPI) 
      {
        console.log(error.cAPI.data);
        console.log(error.cAPI.status);
      }
      else if(error.dAPI)
      {
        console.log(error.dAPI.data);
        console.log(error.dAPI.status);
      }
    }
    for (let c of this.state.credits) //adding credits
    { 
      totalCredit = totalCredit + c.amount;
    }
    for (let d of this.state.debits) //subtracting debits 
    { 
      totalDebit = totalDebit - d.amount;
    }
    this.setState({accountBalance:((totalCredit + totalDebit)).toFixed(2)});
  }

  addDebit = (d) => //updating balance
  {
    let update = {
      amount: Number(d.amount).toFixed(2),
      date: d.date,
      description: d.description,
      id: d.id
    }
    let us = this.state.debits;
    us.push(update);
    this.setState({debit: us});
    this.setState({accountBalance: (Number(this.state.accountBalance) - Number(d.amount)).toFixed(2)});
  }

  addCredit = (c) => //updating balance
  {
    let update = {
      amount: Number(c.amount).toFixed(2),
      date: c.date,
      description: c.description,
      id: c.id
    }
    let us = this.state.credits;
    us.push(update);
    this.setState({credit: us});
    this.setState({accountBalance: (Number(this.state.accountBalance) + Number(c.amount)).toFixed(2)});
  }



  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const DebitsComponent = () => (<Debits debits={this.state.debits} accountBalance={this.state.accountBalance} addDebit = {this.addDebit}/>) 
    const CreditsComponent = () => (<Credits credits={this.state.credits} accountBalance={this.state.accountBalance} addCredit = {this.addCredit}/>)
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/ASSIGNMENT4">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;