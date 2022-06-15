import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import GoodsStore from "./store/GoodsStore";

export const Context = createContext(null)
ReactDOM.render(
  <Context.Provider value={
      {
          user: new UserStore(),
          goods:new GoodsStore(),
      }
  }>
    <App />
  </Context.Provider>,
    document.getElementById('root')
);
