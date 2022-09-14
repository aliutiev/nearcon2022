import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./components/utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Products from "./components/marketplace/Products";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/etlogo.png";
import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
  NavLink
} from 'react-router-dom';

import HomePage from './pages/homePage';
import Header from './components/Header'

const App = function AppWrapper() {


  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (

    <BrowserRouter>
      <div className='App'>
        <Header>

          
        </Header>


      </div>
      <>
        <Notification />
        {account.accountId ? (
          <Container fluid="md">
            <Nav className="justify-content-end pt-3 pb-5">
              <Nav.Item>
                <Wallet
                  address={account.accountId}
                  amount={balance}
                  symbol="NEAR"
                  destroy={destroy}
                />
              </Nav.Item>
            </Nav>
            <main>

            </main>
          </Container>
        ) : (
          <Cover login={login} coverImg={coverImg} />
        )}
      </>
    </BrowserRouter>

  );
};

export default App;