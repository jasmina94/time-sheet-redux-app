import { Client, Project } from '../model/model';

const EMAIL_MASK = /\S+@\S+\.\S+/;

export const validateCredentials = (email: string, password: string) => {
    let error = '';

    if (email === undefined || email === '') {
        error = 'E-mail is required!';
        return { isValid: false, error };
    } else if (!EMAIL_MASK.test(email)) {
        error = 'E-mail is not valid!';
        return { isValid: false, error }
    }

    if (password === undefined || password === '') {
        error = 'Password is required!';
        return { isValid: false, error };
    }

    return { isValid: true, error: '' };
}

export const validateClient = (client: Client) => {
    let error = '';

    if (client.name === undefined || client.name === '') {
        error = 'Name is required!';
        return { isValid: false, error };
    }

    if (client.address === undefined || client.address === '') {
        error = 'Address is required!';
        return { isValid: false, error };;
    }
    if (client.city === undefined || client.city === '') {
        error = 'City is required!';
        return { isValid: false, error };;
    }

    if (client.zip === undefined || client.zip === '') {
        error = 'Zip is required!';
        return { isValid: false, error };;
    }

    if (client.country === undefined || client.country === '') {
        error = 'Country is required!';
        return { isValid: false, error };;
    }

    return { isValid: true, error: '' };
}


export const validateProject = (project: Project) => {
    let error = '';
    if (project.name === undefined || project.name === '') {
        error = 'Name is required!';
        return { isValid: false, error};
    }
    if (project.status === undefined) {
        error = 'Status is required!';
        return { isValid: false, error};
    }
    if (project.customer === undefined || project.customer === 0) {
        error = 'Customer is required!';
        return { isValid: false, error};
    }
    if (project.lead === undefined || project.lead === 0) {
        error = 'Lead is required!';
        return { isValid: false, error};
    }

    return { isValid: true, error: ''};
}