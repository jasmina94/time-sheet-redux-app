import { useState, useRef} from 'react';
import { useAppDispatch } from '../state/hooks';
import { history } from '../_helpers/historyHelper';
import MainLogo from '../components/shared/MainLogo'
import { resetPassword } from '../state/actions/user.actions';

export const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();

    const emailInput = useRef<HTMLInputElement>(null);
	const [error, setError] = useState('');
    
    const handleResetPassword = (e: any) => {
		e.preventDefault();
        const _email = emailInput.current?.value;

		if (_email && _email !== '') {
            dispatch(resetPassword(_email));
        } else {
            setError('Email is required field!');
        }
    }

    return (
		<div className='wrapper centered'>
			<MainLogo altImg='Login' clickHandler={() => history.push('/')}/>
			<div className='centered-content-wrap'>
				<div className='centered-block'>
					<h1>Reset password</h1>
					<ul>
						<li>
							<input type='text' placeholder='Email' className='in-text large' ref={emailInput} onChange={() => setError('')}/>
						</li>
						<li>
							<label className='error-label'>{error}</label>
						</li>
						<li className='right'>
							<a href=' ' className='btn blue' onClick={handleResetPassword}>Reset password</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}