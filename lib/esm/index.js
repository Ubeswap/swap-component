import { jsx as _jsx } from "react/jsx-runtime";
import './i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import './index.css';
import Swap from 'pages/Swap';
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(Swap, {}, void 0) }, void 0), document.getElementById('root'));
export default Swap;
