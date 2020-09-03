import 'systemjs';
import React from 'react';
import { render } from 'react-dom';

import { ROOT_ELEMENT_ID } from 'constants/app.constants';

import { Layout } from 'components/layout';

import { register } from './app';

render(<Layout />, document.getElementById(ROOT_ELEMENT_ID));
register();
