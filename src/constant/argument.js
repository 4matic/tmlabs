import {
  EMAIL_LEAKS,
  SCAN,
  HASH,
  DNS,
  ME,
  IP
} from './endpoint';

const argument = {
  [EMAIL_LEAKS]: [
    {
      arg: 'email',
      required: true,
    },
  ],
  [SCAN]: [
    {
      arg: 'ip',
      required: true,
    },
    {
      arg: 'portmin',
      required: false,
    },
    {
      arg: 'portmax',
      required: false,
    },
  ],
  [HASH]: [
    {
      arg: 'hash',
      required: true,
    },
  ],
  [IP]: [
    {
      arg: 'ipaddr',
      required: true,
    },
    {
      arg: 'mode',
      required: false,
    },
  ],
  [DNS]: [
    {
      arg: 'domain',
      required: true,
    },
  ],
  [ME]: [
    {
      arg: 'mode',
      required: false,
    },
  ],
};

export default argument;

