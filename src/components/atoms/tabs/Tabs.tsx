import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BasicTabsProps } from '../../../common/types';
import './tabs.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 1.5 }}>{children}</Box>}
    </div>
  );
}

const BasicTabs: React.FC<BasicTabsProps> = ({ tabs, executionInfo, currentFileId }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const checkFileId = () => {
    if (executionInfo?.find((element) => element.fileId === currentFileId)) {
      return false;
    }
    return true;
  };

  if (tabs.length > 0) {
    return (
      <Box>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{ style: { background: 'gray' } }}>
              {tabs.map(({ label }, i) => (
                <Tab
                  disabled={checkFileId()}
                  label={label}
                  key={i}
                  disableRipple={true}
                  sx={{ '&.Mui-selected': { backgroundColor: 'white' } }}
                />
              ))}
            </Tabs>
          </Box>
          {tabs.map(({ component }, i) => (
            <TabPanel value={value} index={i} key={i}>
              {component}
            </TabPanel>
          ))}
        </div>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default BasicTabs;
