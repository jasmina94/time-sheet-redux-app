import '../assets/css/Styles.css';
import { useHistory } from 'react-router';
import {
    ClientsTabContent, TimeSheetTabContent,
    ReportsTabContent, ProjectsTabContent,
    CategoriesTabContent, TeamMembersTabContent
  } from '../components/tabs';
import { useState } from 'react';

const HomePage = () => {
    const history = useHistory();

    const [activeTab, setActiveTab] = useState('timesheet');

    const renderTabContent = () => {
        switch (activeTab) {
          case 'timesheet':
            return <TimeSheetTabContent />
          case 'clients':
            return <ClientsTabContent />
          case 'projects':
            return <ProjectsTabContent />
          case 'categories':
            return <CategoriesTabContent />
          case 'team-memebers':
            return <TeamMembersTabContent />
          case 'reports':
            return <ReportsTabContent />
          default:
            return <TimeSheetTabContent />
        }
      }


}