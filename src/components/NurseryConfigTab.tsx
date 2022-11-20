import Box from '@mui/material/Box';
import NavTabs, { PagesLinksProps } from './NavTabs';


interface NurseryConfigTabProps{
    index: number;
}

export default function NurseryConfigTab(props : NurseryConfigTabProps) {

  
  return (
    <Box sx={{ width: '100%' }}>
      <NavTabs 
        tabValue={props.index}
        pages={nurseryConfigPages}
      />
    </Box>
  );
}

const nurseryConfigPages = [
    {
        href: '/params/cultivation/propagation-type',
        label: 'Tipo Propagação'

    } as PagesLinksProps,
    {
        href: '/params/cultivation/fase-cultivo',
        label: 'Fase de Cultivo'

    } as PagesLinksProps,
    {
        href: '/params/cultivation/genetic',
        label: 'Genética'

    } as PagesLinksProps,
    {
        href: '/params/cultivation/location',
        label: 'Localização'

    } as PagesLinksProps,
    {
        href: '/params/cultivation/recipiente',
        label: 'Recipiente'

    } as PagesLinksProps,
    {
        href: '/params/cultivation/trash-reason',
        label: 'Razão Descarte'

    } as PagesLinksProps,
    {
      href: '/params/cultivation/section',
      label: 'Seção'

  } as PagesLinksProps,
  {
    href: '/params/cultivation/genetic-profile',
    label: 'Perfil Genético'

} as PagesLinksProps,
];