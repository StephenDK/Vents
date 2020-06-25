export const createNewEvent = (user, photoURL, event) => {
    return {
        ...event,
        hostedUid: user.uid,
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