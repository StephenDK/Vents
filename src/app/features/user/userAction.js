import { toastr } from "react-redux-toastr";

// 16.10 this file will contain the action for a user to update 
// their profile

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.updateProfile(user);
            toastr.success('Success', 'Your profile has been updated')
        } catch (error) {
            console.log(error);
        }
    }