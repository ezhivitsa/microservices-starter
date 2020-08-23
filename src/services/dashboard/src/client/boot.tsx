import React from 'react';
import ReactDom from 'react-dom';

import { lib } from '@packages/client';

import { App } from './app';

import { setContainer, getRootElement } from './container';

interface MountProps {
  container?: Element;
}

export async function bootstrap(): Promise<void> {
  console.log('dashboard app bootstrapped');
}

export async function mount(props: MountProps = {}): Promise<void> {
  const { container } = props;
  setContainer(container);

  ReactDom.render(<App />, getRootElement());
}

export async function unmount(): Promise<void> {
  ReactDom.unmountComponentAtNode(getRootElement());
}

if (!lib.isQiankum()) {
  lib.onWindowLoad(mount);
}
