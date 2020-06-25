import { toastr } from "react-redux-toastr";
import { asyncActionStart, asyncActionFinished, asyncActionError } from "../async/asyncActions";
import cuid from 'cuid';


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
// 17.16 now that the photo submit method is setup, import the method 
// into our component and attach it to a button. Head to PhotosPage.jsx


// 17.23 This will be the action to delete a photo
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
// now import the method inside the photosPage.jsx and then pass it down 
// into the UserPhotos.jsx component