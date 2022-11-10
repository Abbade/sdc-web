import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { breakpoints } from '@mui/system';
import {AnchorLink} from '../components/Layout'

interface LinkTabProps {
  label?: string;
  href?: string;
}
export interface PagesLinksProps{
  label: string;
  href: string;
}
interface NavTabProps{
  tabValue: number;
  pages?: PagesLinksProps[];
}

function LinkTab(props: LinkTabProps) {
  return (
    <AnchorLink href={props.href}>
        <Tab
          label={props.label}
        />
    </AnchorLink>

  );
}

export default function NavTabs(props : NavTabProps) {


  return (
    <Box sx={{maxWidth: { xs: 320, sm: 480, md: 780, lg: 1080, xl:  1416},  mb: 2}}>
      <Tabs value={props.tabValue} variant="scrollable"  scrollButtons="auto" aria-label="nav tabs">
        {
          props.pages?.map((page, index) => 
            (
              <LinkTab key={`page_${index}`} label={page.label} href={page.href} />
            )
            )
        }
      </Tabs>
    </Box>
  );
}
