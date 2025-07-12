import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
// import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AppTheme from "../shared-theme/AppTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

const mainListItems = [
  { text: "Insights", icon: <HomeRoundedIcon />, path: "/insights" },
 
  {
    text: "Products",
    icon: <PeopleRoundedIcon />,
    path: "/products",
    children: [
      {
        text: "Bakery",
        icon: <FiberManualRecordIcon />,
        path: "/bakery-products",
      },
      {
        text: "Dairy",
        icon: <FiberManualRecordIcon />,
        path: "/dairy-products",
      },
      {
        text: "Namakin",
        icon: <FiberManualRecordIcon />,
        path: "/namakin-products",
      },
      {
        text: "Biscuits",
        icon: <FiberManualRecordIcon />,
        path: "/biscuits-products",
      },
      {
        text: "Cakes",
        icon: <FiberManualRecordIcon />,
        path: "/cskes-products",
      },
      {
        text: "Laddu",
        icon: <FiberManualRecordIcon />,
        path: "/laddu-products",
      },
    ],
  },
  {
    text: "Workflow",
    icon: <LayersOutlinedIcon />,
    path: "/workfolw",
    children: [
      { text: "Jobs", icon: <FiberManualRecordIcon />, path: "/jobs" },
      { text: "Tasks", icon: <FiberManualRecordIcon />, path: "/tasks" },
      {
        text: "Pipelines",
        icon: <FiberManualRecordIcon />,
        path: "/pipelines",
      },
    ],
  },
  {
    text: "Billing",
    icon: <PaymentsOutlinedIcon />,
    path: "/billing",
    children: [
      {
        text: "Time Entries",
        icon: <FiberManualRecordIcon />,
        path: "/time_entries",
      },
      { text: "Invoices", icon: <FiberManualRecordIcon />, path: "/bills" },
      {
        text: "Proposals & ELS",
        icon: <FiberManualRecordIcon />,
        path: "/proposals",
      },
    ],
  },
  { text: "Templates", icon: <PlaylistAddOutlinedIcon />, path: "/templates" },
  { text: "Settings", icon: <SettingsRoundedIcon />, path: "/settings" },
];

export default function MenuContent(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = React.useState({});

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderMenuItem = (item) => {
    const isActive =
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/");
    const hasChildren = Array.isArray(item.children);
    const isOpen = openSubmenus[item.text];

    return (
      <AppTheme {...props}>
        <React.Fragment key={item.text}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isActive}
              onClick={() => {
                if (hasChildren) {
                  toggleSubmenu(item.text);
                } else {
                  navigate(item.path);
                }
              }}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={{ color: "text.menu" }}>
                {item.text}
              </ListItemText>
              {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{
                  ml: 3, // indent from parent
                  borderLeft: "1px solid #e0e0e0", // light vertical line
                }}
              >
                {item.children.map((child) => (
                  <ListItem key={child.text} disablePadding>
                    <ListItemButton
                      selected={location.pathname === child.path}
                      onClick={() => navigate(child.path)}
                      sx={{
                        pl: 3,
                        mb: 0.9,
                        borderRadius: 0,
                        position: "relative",
                        "&.Mui-selected": {
                          bgcolor: "#f0f7ff", // light blue background
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: -10,
                            top: 0,
                            bottom: 0,
                            width: "3px",
                            backgroundColor: "#1976d2", // blue vertical line
                          },
                        },
                      }}
                    >
                      <ListItemText
                        sx={{ color: "text.menu" }}
                        primary={child.text}
                        primaryTypographyProps={{ fontSize: "1rem" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      </AppTheme>
    );
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>{mainListItems.map(renderMenuItem)}</List>
    </Stack>
  );
}

//           <Collapse in={isOpen} timeout="auto" unmountOnExit>
// <List
//   component="div"
//   disablePadding
//   sx={{
//     ml: 3, // indent from parent
//     borderLeft: '1px solid #e0e0e0', // light vertical line
//   }}
// >
//   {item.children.map((child) => (
//     <ListItem key={child.text} disablePadding>
//       <ListItemButton
//         selected={location.pathname === child.path}
//         onClick={() => navigate(child.path)}
//         sx={{
//           pl: 3,
//           borderRadius: 0,
//           position: 'relative',
//           '&.Mui-selected': {
//             bgcolor: '#f0f7ff', // light blue background
//             '&::before': {
//               content: '""',
//               position: 'absolute',
//               left: -10,
//               top: 0,
//               bottom: 0,
//               width: '3px',
//               backgroundColor: '#1976d2', // blue vertical line
//             },
//           },
//           '&:hover': {
//             bgcolor: '#f9f9f9',
//           },
//         }}
//       >
//         <ListItemText
//           primary={child.text}
//           primaryTypographyProps={{ fontSize: '0.875rem' }}
//         />
//       </ListItemButton>
//     </ListItem>
//   ))}
// </List>
// </Collapse>
{
  /* <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.text} disablePadding >
                  <ListItemButton
                    selected={location.pathname === child.path}
                    onClick={() => navigate(child.path)}
                    sx={{ borderRadius: 2 }}
                  >
                     <ListItemIcon >{child.icon}</ListItemIcon>
                    <ListItemText primary={child.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> */
}
