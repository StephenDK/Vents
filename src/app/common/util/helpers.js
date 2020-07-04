// 18.8 the helper function below takes an object and puts it into an array
// now we need to uses this helper function
// go to EventDetailedPage.jsx
export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], {id: e[0]}))
    }
}




export const createNewEvent = (user, photoURL, event) => {
    return {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: photoURL || '/assets/user.png',
        created: new Date(),
        attendees: {
            [user.uid]: {
                going: true,
                joinDate: new Date(),
                photoURL: photoURL || '/assets/user.png',
                displayName: user.displayName,
                host: true
            }
        }
    }
}

// 18.3 this is the shape of the data we are going to be sending up to firestore
// head back to the eventActions file and import this method