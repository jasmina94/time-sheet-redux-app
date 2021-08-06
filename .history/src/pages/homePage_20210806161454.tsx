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
    const [toggleOpenProfile, setToggleOpenProfile] = useState(false);

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

    const handleProfileLink = () => {

    }

    return (
        <div className='container'>
            <header>
                <div className='top-bar'></div>
                <div className='wrapper'>
                    <a href=' ' className='logo' onClick={() => history.push('/')}>
                        <img src='logo.png' alt='Emakina Timesheet' />
                    </a>
                    <ul className='user right'>
                        <li>
                            <a href='!#' onClick={handleProfileLink}>{userInfo.firstname} {userInfo.lastname}</a>
                            <div className='invisible'></div>
                            {openProfile && (<UserMenu />)}
                        </li>
                        <li className='last'>
                            <a href='!#' onClick={logout}>Logout</a>
                        </li>
                    </ul>
                    <nav>
                        <Menu activeTab={activeTab} handleTabClick={handleTabClick} menuItems={menuItems} />
                        <MobileMenu activeTab={activeTab} handleTabClick={handleTabClick} menuItems={menuItems} />
                        <span className='line'></span>
                    </nav>
                </div>
            </header>
            <div className='wrapper'>
                {renderTabContent()}
            </div>
            <Footer />
        </div>

    );
}