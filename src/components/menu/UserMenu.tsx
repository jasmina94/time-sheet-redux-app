import '../../assets/css/Styles.css';
import '../../assets/css/CustomStyles.css';
import { history } from '../../_helpers/historyHelper';

export const UserMenu = () => {
    
    return (
        <div className='user-menu'>
            <ul>
                <li>
                    <a href=' ' onClick={() => history.push('/changePassword')} className='link'>Change password</a>
                </li>
                <li>
                    <a href=' ' className='link'>Settings</a>
                </li>
                <li>
                    <a href=' ' className='link'>Export all data</a>
                </li>
            </ul>
        </div>
    )
};