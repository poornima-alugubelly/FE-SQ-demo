import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardCard } from './components/Dashboard/DashboardCard';
import { UserProfile } from './components/UserProfile/UserProfile';
import { DataTable } from './components/DataTable/DataTable';
import { ApiService } from './components/ApiService/ApiService';
import { FormValidation } from './components/FormValidation/FormValidation';
import { Performance } from './components/Performance/Performance';
import { Security } from './components/Security/Security';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';

function App() {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          style={{ margin: '20px 0', textAlign: 'center' }}
        >
          SonarQube Issues Demo
        </Typography>
        <Typography
          variant="body1"
          style={{ marginBottom: '20px', textAlign: 'center' }}
        >
          This application contains various code issues that SonarQube
          would detect
        </Typography>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            marginBottom: '20px',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="demo tabs"
          >
            <Tab label="Dashboard" />
            <Tab label="User Profile" />
            <Tab label="Data Table" />
            <Tab label="API Service" />
            <Tab label="Form Validation" />
            <Tab label="Performance" />
            <Tab label="Security" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Dashboard Component
            </Typography>
            <DashboardCard
              title="Sample Dashboard"
              data={{ value: 42 }}
              onUpdate={(data) => console.log('Updated:', data)}
            />
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              User Profile Component
            </Typography>
            <UserProfile />
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Data Table Component
            </Typography>
            <DataTable
              data={[
                {
                  id: 1,
                  name: 'John Doe',
                  value: 100,
                  category: 'Admin',
                },
                {
                  id: 2,
                  name: 'Jane Smith',
                  value: 200,
                  category: 'User',
                },
                {
                  id: 3,
                  name: 'Bob Johnson',
                  value: 150,
                  category: 'Manager',
                },
              ]}
              onRowClick={(item) => console.log('Clicked:', item)}
              onRowEdit={(item) => console.log('Edit:', item)}
              onRowDelete={(item) => console.log('Delete:', item)}
            />
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              API Service Component
            </Typography>
            <ApiService />
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Form Validation Component
            </Typography>
            <FormValidation />
          </Box>
        )}

        {activeTab === 5 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Performance Component
            </Typography>
            <Performance />
          </Box>
        )}

        {activeTab === 6 && (
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Security Component
            </Typography>
            <Security />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
