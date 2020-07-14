import { toastr } from "react-redux-toastr";
import { asyncActionStart, asyncActionFinished, asyncActionError } from "../async/asyncActions";
import cuid from 'cuid';




export const updateProfile = (user) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        //console.log(user);
        // without destructoring user above firebase receives 
        // the isLoaded and isEmpty proterties
        // uncomment the console.log above to see user
        const { isLoaded, isEmpty, ...updatedUser } = user;
        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Your profile has been updated')
        } catch (error) {
            console.log(error);
        }
    }


export const uploadProfileImage = (file, fileName) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        // 17.22 We are going to append a unique id to the filename of the photo
        // so instead of usinf fileName below we will be using cuid which we must import
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };
        try {
            dispatch(asyncActionStart());
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            // get the url of the image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get the user document from firestore
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if the user has a photo ? null : update profile image
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos' }]
            }, {
                name: imageName,
                url: downloadURL
            })
            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }


export const deletePhoto = (photo) => 
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            })
        }
        catch (error) {
            console.log(error);
            throw new Error('Problem deleting the photo');
        }
    }
// 17.24 now head over to the PhotosPage.jsx and import the action 
// into the mapDispatchToProps

// 17.28 this is the method that allows the user to choose the main photo
export const setMainPhoto = (photo) => 
async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
        return await firebase.updateProfile({
            photoURL: photo.url
        })
    }
    catch (error) {
        console.log(error);
        throw new Error('Problem setting main photo');
    }
}



// 18.26 This method below will be for joining events and becoming
// attendees for events
export const goingToEvent = (event) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;
        const attendee = {
            going: true,
            joinDate: firestore.FieldValue.serverTimestamp(),
            photoURL: profile.photoURL || '/assets/user.png',
            displayName: profile.displayName,
            host: false
        };
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: attendee
            })
            await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
                eventId: event.id,
                userUid: user.uid,
                eventDate: event.date,
                host: false
            })
            toastr.success('Success', 'You have signed up for the event!');
        } catch (error) {
            console.log(error);
            toastr.error('Oops', 'Problem signing up for the event');
        }
    }
    // Now we have to add this new method into our eventDetailed page
    // head there now eventDetailedPage.js

    // 18.29 We are going to setup the cancel going to event method
    export const cancelGoingToEvent = (event) =>
        async (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();
            const firebase = getFirebase();
            const user = firebase.auth().currentUser;
            try {
                await firestore.update(`events/${event.id}`, {
                    [`attendees.${user.uid}`]: firestore.FieldValue.delete()
                })
                await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
                toastr.success('Success', 'You have removed yourself from the event.')
            } catch (error) {
                console.log(error);
                toastr.error('Opps', 'Something went wrong');
            }
        } 
    // Now head over to eventDetailed page to hook up this method