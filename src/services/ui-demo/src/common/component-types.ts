type Extension = 'tsx' | 'jsx';

export interface GetComponentResponse {
  name: string;
  code: string;
  extension: Extension;
}
