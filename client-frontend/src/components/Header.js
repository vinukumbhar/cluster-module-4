// import Stack from "@mui/material/Stack";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

// import MenuButton from "./MenuButton";
// import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";

// export default function Header() {

//   return (
//     <Stack
//       direction="row"
//       sx={{
//         display: { xs: "none", md: "flex" },
//         width: "100%",
//         alignItems: { xs: "flex-start", md: "center" },
//         justifyContent: "space-between",
//         maxWidth: { sm: "100%", md: "1700px" },
//         pt: 1.5,
//       }}
//       spacing={2}
//     >
//       <Stack direction="row" sx={{ gap: 1 }}>

//         <MenuButton showBadge aria-label="Open notifications">
//           <NotificationsRoundedIcon />
//         </MenuButton>
//         <ColorModeIconDropdown />
//       </Stack>
//     </Stack>
//   );
// }

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Logo from "../assets/logoto.png";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import userProfile from "../assets/profilePicture.jpg";
import { useNavigate,useLocation } from "react-router-dom";
export default function Header() {
  const navItems = ["Home", "Template", "History", "Status", "Cart"];
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
        px: 2,
      }}
    >
      {/* Left - Logo + Org name */}
      <Stack direction="row" spacing={1} alignItems="center">
        <img
          src={Logo} // replace with actual path
          alt="Logo"
          style={{ width: 50, height: 50 }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#002366",
            textAlign: "left",
          }}
        >
          SHRI HANUMAN SAHAKARI DUDH VYAVSAYIK , KRUSHIPURAK <br />
          SEVA SANSTHA MARYADIT , YALDUD
        </Typography>
      </Stack>

      {/* Center - Navigation Buttons */}
    {/* <Stack direction="row" spacing={2}>
      {navItems.map((label) => {
        const route = `/${label.toLowerCase()}`;
        const isActive = location.pathname === route || (route === "/home" && location.pathname === "/");

        return (
          <Button
            key={label}
            variant={isActive ? "contained" : "outlined"}
            onClick={() => navigate(route)}
            sx={{ borderRadius: 2, minWidth: 90 }}
          >
            {label}
          </Button>
        );
      })}
    </Stack> */}
<Stack direction="row" spacing={2}>
  {navItems.map((label) => {
    const route = `/${label.toLowerCase()}`;

    const isActive =
      route === "/home"
        ? location.pathname.startsWith("/home")
        : location.pathname === route;

    return (
      <Button
        key={label}
        variant={isActive ? "contained" : "outlined"}
        onClick={() => navigate(route)}
        sx={{ borderRadius: 2, minWidth: 90 }}
      >
        {label}
      </Button>
    );
  })}
</Stack>

      {/* Right - User Info, Notification, Theme, Menu */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          alt="Rahul Patil"
          src={userProfile} // Replace with actual image URL
          sx={{ width: 36, height: 36 }}
        />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Rahul Patil
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Jaybhavani Store
          </Typography>
        </Box>
        {/* <Badge color="error" badgeContent={1}>
          <NotificationsRoundedIcon sx={{ color: "#f5b400" }} />
        </Badge> */}
        <MenuIcon sx={{ ml: 1 }} />
        <ColorModeIconDropdown />
        <MenuButton showBadge aria-label="Open notifications">
          {/* You already have this for notifications */}
          <NotificationsRoundedIcon />
        </MenuButton>
      </Stack>
    </Stack>
  );
}
