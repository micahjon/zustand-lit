import './style.css'
import create, { State } from 'zustand/vanilla'
import { html } from 'lit-html';
import {setupComponent} from './core'

type MyState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  _color: string;
  setColor: (newColor: string) => void;
};

const myStore = create<MyState>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  _color: 'red',
  setColor: (newColor) => set(() => ({ _color: newColor })),
}));

function Component() {
  const { bears, increasePopulation, removeAllBears, _color, setColor } = myStore.getState();

  // Run effect based on condition

  return html`
    <p>How many "${_color}" bears?</p>
    <p class="test">${bears} bears</p>
    <button @click=${increasePopulation}>Add</button>
    <button @click=${removeAllBears}>Clear</button>
    <p><input value="${_color}" @blur=${(event: Event) => {
      setColor((event.target as HTMLInputElement).value)
    }
    }></p>
  `
}

// const { getState, setState, subscribe, destroy } = store;
setupComponent(myStore, Component, document.querySelector<HTMLDivElement>('#app'));

console.log('first render test', (document.querySelector('#app .test') as HTMLParagraphElement).innerHTML)