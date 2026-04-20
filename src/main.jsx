import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './services/apolloClient';
import App from './App';
import './index.css';
import "./aws-config";

const Main = () => (
  <ApolloProvider client={client}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Main />
);
