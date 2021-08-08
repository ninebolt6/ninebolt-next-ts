import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'nineboltnext',
  apiKey: process.env.API_KEY || '',
});