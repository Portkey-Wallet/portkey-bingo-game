import { createMachine } from 'xstate';

type HeaderEvent = { type: 'TOGGLE' };

export const HeaderMachine = createMachine<undefined, HeaderEvent>({
  id: 'header',
  initial: 'closed',
  states: {
    opened: {
      on: {
        TOGGLE: {
          target: 'closed',
        },
      },
    },
    closed: {
      on: {
        TOGGLE: {
          target: 'opened',
        },
      },
    },
  },
});
