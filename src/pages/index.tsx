import { definePageConfig } from 'ice';
import Fabritor from '@/fabritor';

export const pageConfig = definePageConfig(() => ({
  title: 'Care Label Design System'
}));

export default function () {
  return <Fabritor />;
}
