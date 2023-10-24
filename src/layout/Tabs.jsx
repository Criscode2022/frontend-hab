import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ListofPosts from '../components/ListofPosts';
import ListofPostsFollowing from '../components/ListofPostsFollowing';
import ListofPersonalPosts from '../components/ListofPersonalPosts';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'rgb(187, 138, 224)' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ color: 'white', fontWeight: 'bold' }} label="Todos" {...a11yProps(0)} />
          <Tab sx={{ color: 'white', fontWeight: 'bold' }} label="Siguiendo" {...a11yProps(1)} />
          <Tab sx={{ color: 'white', fontWeight: 'bold' }} label="Mis enlaces" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ListofPosts></ListofPosts>      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ListofPostsFollowing></ListofPostsFollowing>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ListofPersonalPosts></ListofPersonalPosts>
      </CustomTabPanel>

    </Box>
  );
}
