import React from 'react';
import Route from './src/navigator/Route';
import { Provider } from 'react-redux';
import { store } from './src/_redux/store';

export default class App extends React.Component {

  render() {
    return (
      < Provider store={store}>
        <Route />
      </Provider>
    );
  }
}
console.disableYellowBox=true;