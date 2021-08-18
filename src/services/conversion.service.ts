import { User } from '../model/model';
 
export const conversionService = {

    toUser: function(data: any) {
        const user: User = {
            id: data.id,
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname
        }
        
        return user;
    }
}