import { createStore, applyMiddleware } from 'redux'

const logger = (store: any) => {
    return (next: any) => (action: any) => {
        console.log('Will dispatch...', action);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log('State after dispatch...', store.getState());

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    }    
}