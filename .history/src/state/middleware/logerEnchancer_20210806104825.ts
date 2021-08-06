export default function logger({getState}) {
    return next => action => {
        console.log('Will dispatch...', action);

            // Call the next dispatch method in the middleware chain.

        const returnValue = next(action);

        console.log('State after dispatch...', getState());


    }
}