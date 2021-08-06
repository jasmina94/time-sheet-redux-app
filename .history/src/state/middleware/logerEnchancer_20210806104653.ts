export default function logger({getState}) {
    return next => action => {
        console.log('Will dispatch', action);

        const returnValue = next(action);
    }
}