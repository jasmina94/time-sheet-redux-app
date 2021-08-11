import '../assets/css/Styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../_helpers/historyHelper';
import { logoutUser } from '../state/actions/user.actions';
import ClientsTabContent from '../components/tabs/ClientsTabContent';
import ProjectsTabContent from '../components/tabs/ProjectsTabContent';
import {
    TimeSheetTabContent,
    ReportsTabContent,
    CategoriesTabContent, TeamMembersTabContent
} from '../components/tabs';
import Footer from '../components/shared/Footer';
import { Menu, MobileMenu, UserMenu, menuItems } from '../components/menu';
import { useState } from 'react';

const HomePage = (props: any) => {
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

    const handleProfileLink = (e: any) => {
        e.preventDefault();
        setToggleOpenProfile(!toggleOpenProfile);
    }

    const logout = (e: any) => {
        e.preventDefault();
        props.logoutUser();
    }

    const handleTabClick = (e: any) => {
        e.preventDefault();
        const id = e.target.id;
        setActiveTab(id);
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
                            <a href='!#' onClick={handleProfileLink}>{props.user.firstname} {props.user.lastname}</a>
                            <div className='invisible'></div>
                            {toggleOpenProfile && (<UserMenu />)}
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

HomePage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state: any) => ({
    user: state.userReducer.userInfo
});

export default connect(mapStateToProps, { logoutUser })(HomePage);