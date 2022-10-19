import * as React from "react";
import { ReactNode } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ForestIcon from "@mui/icons-material/Forest";
import GrassIcon from "@mui/icons-material/Grass";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "./Link";
import { AuthContext } from "../contexts/AuthContext";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { grey } from "@mui/material/colors";
import { ListSubheader } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  //backgroundColor: grey[100],
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // backgroundColor: grey[100],
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AnchorLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,

    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
type Props = {
  children: React.ReactNode;
};
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: grey[200],
  width: drawerWidth,
  flexShrink: 0,
  marginRight: theme.spacing(1),
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),

    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
interface LayoutProps {
  children?: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const { isAuthenticated, signOut } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElTrans, setAnchorElTrans] = React.useState<null | HTMLElement>(
    null
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuTrans = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTrans(event.currentTarget);
  };

  const handleCloseTrans = () => {
    setAnchorElTrans(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <AnchorLink href={"/dashboard"}>SGC</AnchorLink>
          </Typography>
          {isAuthenticated && (
            <div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElTrans}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElTrans)}
                onClose={handleCloseTrans}
              ></Menu>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={signOut}>Sair</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <CustomMenu
            keylink="cultio_link"
            name="Cultivo"
            open={open}
            icon={<ForestIcon />}
          >
            <>
            <CustomLink
              keylink="clone_link"
              linkstr="/nursery"
              name="Berçario"
              open={open}
              icon={<GrassIcon />}
            />
            <CustomLink
              keylink="clone_link"
              linkstr="/plants"
              name="Plantas"
              open={open}
              icon={<ForestIcon />}
            />
            <CustomLink
              keylink="clone_link"
              linkstr="/plants"
              name="Relatórios"
              open={open}
              icon={<TrendingUpIcon />}
            />
               <CustomLink
              keylink="clone_link"
              linkstr="/plants"
              name="Parâmetros"
              open={open}
              icon={<SettingsIcon />}
            />
            </>
       
            
          </CustomMenu>

          {/* <CustomLink keylink='audit_lkb' linkstr='apr' name='Auditorias' open={open} icon={<PageviewIcon />} /> */}

          {/* mais aqui */}
        </List>
        <Divider />

        <List>
          <CustomMenu
            keylink="cultio_link"
            name="Atividades"
            open={open}
            icon={<AssignmentTurnedInIcon />}
          >
            <CustomLink
              keylink="clone_link"
              linkstr="/nursery"
              name="Fluxo"
              open={open}
              icon={<AssignmentTurnedInIcon />}
            />
          </CustomMenu>

          {/* <CustomLink keylink='audit_lkb' linkstr='apr' name='Auditorias' open={open} icon={<PageviewIcon />} /> */}

          {/* mais aqui */}
        </List>
        <Divider />

        <Divider />
        <List>
          <AnchorLink href="/" />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1, height: `100vh` }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
export interface ICustomLink {
  open: boolean;
  linkstr: string;
  keylink: string;
  name: string;
  icon: JSX.Element;
}

export interface ICustomMenu {
  keylink: string;
  open: boolean;
  name: string;
  icon: JSX.Element;
  children: JSX.Element;
}

const CustomMenu = ({ keylink, name, children, icon, open }: ICustomMenu) => {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        {open && <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const CustomLink = ({ keylink, linkstr, name, open, icon }: ICustomLink) => {
  return (
    <AnchorLink href={linkstr}>
      <ListItemButton
        key={keylink}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </AnchorLink>
  );
};
