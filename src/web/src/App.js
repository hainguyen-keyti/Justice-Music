import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Route from './router';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

class App extends Component {
  render(){
    return (
      <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
          <Route/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;