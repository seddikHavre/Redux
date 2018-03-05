import React from 'react';
import {render} from 'react-dom'
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider}    from 'react-redux'
import './index.css';
import App from './App';

export const store=createStore(reducer);


render (

<Provider store={store}>
<App />
</Provider>,
document.getElementById('root')


)

store.subscribe(
 () => console.log('rien')

)



