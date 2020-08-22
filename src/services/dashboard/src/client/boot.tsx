import React from 'react';
import ReactDom from 'react-dom';

import { lib } from '@packages/client';

import { App } from './app';

interface MountProps {
  container?: Element;
}

function getContainer(container?: Element): Element {
  return container
    ? (container.querySelector('#dashboard-root') as Element)
    : (document.getElementById('dashboard-root') as Element);
}

export async function bootstrap(): Promise<void> {
  console.log('dashboard app bootstrapped');
}

export async function mount(props: MountProps = {}): Promise<void> {
  const { container } = props;

  ReactDom.render(<App />, getContainer(container));
}

export async function unmount(props: MountProps = {}): Promise<void> {
  const { container } = props;
  ReactDom.unmountComponentAtNode(getContainer(container));
}

if (!lib.isQiankum()) {
  lib.onWindowLoad(mount);
}
