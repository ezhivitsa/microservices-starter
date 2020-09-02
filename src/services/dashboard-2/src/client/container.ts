let container: Element | Document = document;

export function getContainer(): Element | Document {
  return container;
}

export function setContainer(element?: Element): void {
  if (element) {
    container = element;
  }
}

export function getRootElement(): Element {
  return getContainer().querySelector('#dashboard-root') as Element;
}
