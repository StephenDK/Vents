import { toastr } from "react-redux-toastr";
import { asyncActionStart, asyncActionFinished, asyncActionError } from "../async/asyncActions";

// 16.10 this file will contain the action for a user to update 
// their profile

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

// 16.11 head to settings dashboard to import this action
// then pass the action to the basicPage component

// 17.15 this is the method to upload the cropped phot picked by the user
export const uploadProfileImage = (file, fileName) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: fileName
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
                name: fileName,
                url: downloadURL
            })
            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }
// 17.16 now that the photo submit method is setup, import the method 
// into our component and attach it to a button. Head to PhotosPage.jsx