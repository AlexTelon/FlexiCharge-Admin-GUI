import { Tabs, Tab } from '@material-ui/core';
import * as React from 'react';

const ManageUserTabs = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: any, newTab: React.SetStateAction<number>) => {
    setSelectedTab(newTab);
  };

  return (
    <> 
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Users" />
        <Tab label="Admins" />
      </Tabs>
    </>
  );
};
export default ManageUserTabs;