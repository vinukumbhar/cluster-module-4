// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
// import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
//   margin: theme.spacing(1, 0),
//   [`& .${breadcrumbsClasses.separator}`]: {
//     color: (theme.vars || theme).palette.action.disabled,
//     margin: 1,
//   },
//   [`& .${breadcrumbsClasses.ol}`]: {
//     alignItems: 'center',
//   },
// }));

// export default function NavbarBreadcrumbs() {
//   return (
//     <StyledBreadcrumbs
//       aria-label="breadcrumb"
//       separator={<NavigateNextRoundedIcon fontSize="small" />}
//     >
//       <Typography variant="body1">Dashboard</Typography>
//       <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
//         Home
//       </Typography>
//     </StyledBreadcrumbs>
//   );
// }

// import React from 'react';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
// import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// import { useLocation } from 'react-router-dom';

// const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
//   margin: theme.spacing(1, 0),
//   [`& .${breadcrumbsClasses.separator}`]: {
//     color: (theme.vars || theme).palette.action.disabled,
//     margin: 1,
//   },
//   [`& .${breadcrumbsClasses.ol}`]: {
//     alignItems: 'center',
//   },
// }));

// const pathToName = {
//   '/': 'Home',
//   '/analytics': 'Analytics',
//   '/clients': 'Clients',
//   '/tasks': 'Tasks',
//   '/settings': 'Settings',
//   '/about': 'About',
//   '/feedback': 'Feedback',
// };

// export default function NavbarBreadcrumbs() {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   return (
//     <StyledBreadcrumbs
//       aria-label="breadcrumb"
//       separator={<NavigateNextRoundedIcon fontSize="small" />}
//     >
//       <Typography variant="body1">Dashboard</Typography>
//       <Typography
//         variant="body1"
//         sx={{ color: 'text.primary', fontWeight: 600 }}
//       >
//         {pathToName[currentPath] || 'Page'}
//       </Typography>
//     </StyledBreadcrumbs>
//   );
// }


import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link, useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

// Mapping full and partial paths to display names
const pathToName = {
  insights: 'Insights',
  analytics: 'Analytics',
  clients: 'Clients',
  accounts: 'Accounts',
  contacts: 'Contacts',
  jobs:'Jobs',
  tasks:'Tasks',
  pipelines:'Pipelines',
  workflow: 'Workflow',
  billing:'Billing',
  templates:'Templates',
  settings: 'Settings',
 
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1" color="text.primary">
      Home
      </Typography>

      {pathnames.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ color: 'text.primary', fontWeight: 600 }}
        >
          {pathToName['']}
        </Typography>
      ) : (
        pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography
              key={to}
              variant="body1"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {pathToName[value] || value}
            </Typography>
          ) : (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography variant="body1">
                {pathToName[value] || value}
              </Typography>
            </Link>
          );
        })
      )}
    </StyledBreadcrumbs>
  );
}
