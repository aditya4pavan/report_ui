import React from 'react';
import './App.css';
import ReportView from './modules/builder/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reportApp from './reducers';
const store = createStore(reportApp)

function App() {
  return (
    <div className="App container-fluid h-100">
      <Provider store={store}>
        <ReportView />
      </Provider>
    </div>
  );
}

export default App;
