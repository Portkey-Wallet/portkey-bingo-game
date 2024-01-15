import { createMachine } from 'xstate';

type LoadingEvent = { type: 'LOADING' } | { type: 'LOADING_EXTRA_NODE' } | { type: 'IDLE' };
export const LoadingMachine = createMachine<undefined, LoadingEvent>({
  id: 'loading',
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOADING: {
          target: 'loading',
        },
        LOADING_EXTRA_NODE: {
          target: 'loadingExtraData',
        },
      },
    },
    loading: {
      on: {
        IDLE: {
          target: 'idle',
        },
      },
    },
    loadingExtraData: {
      on: {
        IDLE: {
          target: 'idle',
        },
      },
    },
  },
});

export const idleSelector = (state) => {
  return state.matches('idle');
};
export const extraNodeSelector = (state) => {
  return state.matches('loadingExtraData');
};
