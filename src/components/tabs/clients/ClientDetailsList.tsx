import { Client } from '../../../model/model';
import ClientDetails from './ClientDetails';

export const ClientDetailsList = (props: any) => {
    return (
        <div className='accordion-wrap clients'>
            {props.clients.map((item: Client) =>
                <ClientDetails key={item.id} client={item} />
            )}
        </div>
    )
}