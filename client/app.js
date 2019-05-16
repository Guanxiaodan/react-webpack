import React from 'react';
import ReactDOM from 'react-dom'; // 将react组件渲染到DOM中
import {AppContainer} from 'react-hot-loader';
import App from './App.jsx';

ReactDOM.hydrate(<App />, document.getElementById('root')) // 将组件挂载到页面上,将<!-- app -->覆盖 

const root = document.getElementById('root')
const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>,
        root
    )
}

render(App)

if(module.hot){ // 当需要热更新的代码出现的时候，将APP重新加载一遍
    module.hot.accept('./App.jsx',() => {
        const NextApp = require('./App.jsx').default
        // ReactDOM.hydrate(<NextApp />, document.getElementById('root')) // 将组件挂载到页面上,将<!-- app -->覆盖 
        render(NextApp)
    })
}