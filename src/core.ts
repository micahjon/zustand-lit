
import create, { StoreApi, State } from 'zustand/vanilla'
import { html, render, TemplateResult } from 'lit-html';

export function setupComponent(store: StoreApi<any>, componentFunction: { (): TemplateResult<1> }, container: any) {
  // Find properties to track
  const initialState = store.getState();
  const keysToTrack = Object.entries(initialState)
    .filter(([key, value]) => !key.startsWith('_') && typeof value !== 'function' )
    .map(([key]) => key);

  console.log({ keysToTrack })
  
  // First render (immediately)
  render(componentFunction(), container);

  // Future renders
  store.subscribe((before: State, after: State) => {
    if (keysToTrack.some(key => before[key] !== after[key])) {
      render(componentFunction(), container);
    }
  })
}
