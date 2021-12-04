// import React from 'react';
// import * as ReactDOM from 'react-dom';
// import { Voyager, VoyagerProps } from './components';

// function init(element: HTMLElement, options: VoyagerProps) {
//   ReactDOM.render(<Voyager {...options} />, element);
// }

// export { Voyager as GraphQLVoyager, Voyager, init };

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
