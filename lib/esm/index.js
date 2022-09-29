import { jsx as _jsx } from "react/jsx-runtime";
import './i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Swap from './pages/Swap';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(Swap, {}) }), document.getElementById('root'));
export default Swap;
