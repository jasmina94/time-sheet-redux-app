import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../state/hooks';
import { history } from '../_helpers/historyHelper';
import MainLogo from '../components/shared/MainLogo'
import { changePassword } from '../state/actions/user.actions';
import * as yup from 'yup';

const schema = yup.object().shape({
    currentPassword: yup.string().required('This is required field!'),
    newPassword: yup.string()
        .required('This is required field!')
        .min(5, 'New password must contain minimum 5 characters!'),
    repeatPassword: yup.string()
        .required('This is required field!')
        .min(5, 'New password must contain minimum 5 characters!')
        .oneOf([yup.ref('newPassword'), null], 'New passwords do not match!')
});


export const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        const current = getValues('currentPassword');
        const newPass = getValues('newPassword');
        const repeatPass = getValues('repeatPassword');
        dispatch(changePassword(current, newPass, repeatPass));
    }

    return (
        <div className='wrapper centered'>
            <MainLogo altImg='Login' clickHandler={() => history.push('/')} />
            <div className='centered-content-wrap'>
                <div className='centered-block'>
                    <h1>Change password</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ul>
                            <li>
                                <input {...register('currentPassword')} type='password' placeholder='Current password' className='in-text large' />
                                <p>{errors.currentPassword?.message}</p>
                            </li>
                            <li>
                                <input {...register('newPassword')} type='password' placeholder='New password' className='in-text large' />
                                <p>{errors.newPassword?.message}</p>
                            </li>
                            <li>
                                <input {...register('repeatPassword')} type='password' placeholder='Reperat new password' className='in-text large' />
                                <p>{errors.repeatPassword?.message}</p>
                            </li>
                            <li className='right'>
                                <input type='submit' className='btn blue' value='Change password'/>
                            </li>
                        </ul>





                    </form>
                    {/* <ul>
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
					</ul> */}
                </div>
            </div>
        </div>
    )
}