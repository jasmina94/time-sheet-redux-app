
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../state/hooks';
import MainLogo from '../components/shared/MainLogo';
import ActionLink from '../components/shared/ActionLink';
import { loginUser } from '../state/actions/user.actions';
import { validateCredentials } from '../services/validation.service';
import { showFailureMessage } from '../state/actions/ui.actions';

export const LoginPage = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleForgetPassword = () => { history.push('/forgotPassword'); }

    const login = () => {
        const validationResult = validateCredentials(email, password);
        if (validationResult.isValid) {
            dispatch(loginUser(email, password, rememberMe));
        } else {
            dispatch(showFailureMessage(validationResult.error));
        }
    }

    const handleFormInputChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    return (
        <div className='wrapper centered'>
            <MainLogo altImg='Login' clickHandler={() => history.push('/')} />
            <div className='centered-content-wrap'>
                <div className='centered-block'>
                    <h1>Login</h1>
                    <ul>
                        <li>
                            <input type='text' placeholder='Email' name='email'
                                className='in-text large' value={email} onChange={handleFormInputChange} />
                        </li>
                        <li>
                            <input type='password' placeholder='Password' name='password'
                                className='in-pass large' value={password} onChange={handleFormInputChange} />
                        </li>
                        <li className='last'>
                            <input type='checkbox' className='in-checkbox' id='remember' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                            <label className='in-label ml-1'>Remember me</label>
                            <span className='right'>
                                <ActionLink content='Forgot password?' action={handleForgetPassword}></ActionLink>
                                <button className='btn blue' onClick={login}>Login</button>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}