import { LifeCycles } from 'single-spa';

interface SystemType {
  import: (url: string) => Promise<LifeCycles>;
}

declare global {
  interface Window {
    System: SystemType;
  }
}
