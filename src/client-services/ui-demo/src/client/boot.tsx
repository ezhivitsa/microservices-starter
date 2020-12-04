import React from 'react';
import { render } from 'react-dom';

import { ROOT_ELEMENT_ID } from 'constants/app.constants';

import { App } from './app';

render(<App />, document.getElementById(ROOT_ELEMENT_ID));
