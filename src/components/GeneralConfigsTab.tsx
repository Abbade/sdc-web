import Box from '@mui/material/Box';
import NavTabs, { PagesLinksProps } from './NavTabs';


interface ConfigTabProps{
    index: number;
}

export default function GeneralConfigTab(props : ConfigTabProps) {

  
  return (
    <Box sx={{ width: '100%' }}>
      <NavTabs 
        tabValue={props.index}
        pages={GeneralConfigPages}
      />
    </Box>
  );
}

const GeneralConfigPages = [
    {
        href: '/company',
        label: 'Empresa'

    } as PagesLinksProps,
    {
        href: '/account',
        label: 'Usuários'

    } as PagesLinksProps,
    {
        href: '/roles',
        label: 'Perfis'

    } as PagesLinksProps
];