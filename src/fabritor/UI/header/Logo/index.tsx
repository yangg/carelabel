import { LOGO_ICON } from '@/assets/icon';
import { CenterV } from '@/fabritor/components/Center';

export default function Logo () {
  return (
    <CenterV gap={5} style={{ paddingLeft: 16 }}>
      <img src={LOGO_ICON} style={{ width: 28 }} />
      <span style={{ fontWeight: 'bold', fontSize: 14 }}>
        Innoways Care Label Design System
      </span>
    </CenterV>
  )
}
