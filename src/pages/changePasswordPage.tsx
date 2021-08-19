import { useRef, useState } from 'react';
import { useAppDispatch } from '../state/hooks';
import { history } from '../_helpers/historyHelper';
import MainLogo from '../components/shared/MainLogo'
import { changePassword } from '../state/actions/user.actions';

export const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const currentPassword = useRef<HTMLInputElement>(null);
    const newPassword = useRef<HTMLInputElement>(null);
    const repeatPassword = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');

    const handleChangePassword = (e: any) => {
        e.preventDefault();
        const _current = currentPassword.current?.value;
        const _new = newPassword.current?.value;
        const _repeat = repeatPassword.current?.value;

        if (_current && _current !== '' && _new && _new !== '' && _repeat && _repeat != ''
                && _new !== _current && _new === _repeat) {
                dispatch(changePassword(_current, _new, _repeat));
        } else {
            setError('Not valid form!');
        }
    }

    return (
        <div className='wrapper centered'>
			<MainLogo altImg='Login' clickHandler={() => history.push('/')}/>
			<div className='centered-content-wrap'>
				<div className='centered-block'>
					<h1>Change password</h1>
					<ul>
						<li>
							<input type='password' placeholder='Current password' className='in-text large' 
                            ref={currentPassword} onChange={() => setError('')}/>
						</li>
                        <li>
							<input type='password' placeholder='New password' className='in-text large' 
                            ref={newPassword} onChange={() => setError('')}/>
						</li>
                        <li>
							<input type='password' placeholder='Repeat new password' className='in-text large' 
                            ref={repeatPassword} onChange={() => setError('')}/>
						</li>
						<li>
							<label className='error-label'>{error}</label>
						</li>
						<li className='right'>
							<a href=' ' className='btn blue' onClick={handleChangePassword}>Change password</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
    )
}