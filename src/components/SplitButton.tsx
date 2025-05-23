import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {IconButton, useMediaQuery} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export interface OptionsImportProps {
  optionsImport: IOptionsImport[];
  onOpenSplitButton: (index: number) => void;
}

export interface IOptionsImport {
  name: string;
  id: number;
}

export default function SplitButton({optionsImport, onOpenSplitButton} : OptionsImportProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up("md"));
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    id: number,
  ) => {
    onOpenSplitButton(id);
    //optionsImport[index].action(true);
    setAnchorEl(null);
  };
  if(optionsImport != null){
    return (
      <div>
        {isSmallOrLess ? 
        <>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              startIcon={ <MoreVertIcon />}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
                  Ações
            </Button>
  
        </> 
        : 
        <>
          <IconButton
  
              aria-label="upload picture"
              component="label"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
        </>}
        <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {optionsImport.map((option, index) => 
                  <MenuItem key={index}  onClick={(event) => handleMenuItemClick(option.id)} disableRipple>
                    {/* {option.icon} */}
                    {option.name}
                </MenuItem>
              )}
  
            </StyledMenu>
      </div>
    );
  }
  return (<></>)
 
}
