import { toastr } from "react-redux-toastr";

// 16.10 this file will contain the action for a user to update 
// their profile

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        //console.log(user);
        // without destructoring user above firebase receives 
        // the isLoaded and isEmpty proterties
        // uncomment the console.log above to see user
        const {isLoaded, isEmpty, ...updatedUser} = user;
        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Your profile has been updated')
        } catch (error) {
            console.log(error);
        }
    }

// 16.11 head to settings dashboard to import this action
// then pass the action to the basicPage component