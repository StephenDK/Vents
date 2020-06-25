// 17.2 snippet for photopage s_17.2.1
// This is the basic setup for our photos page
// head over to DropzoneInput.jsx to setup the DropzoneInput hook
import React, { useState, useEffect, Fragment } from 'react';
// 17.10 we need one more hook called useEffect. What ever we pass to use effect 
// will run after the jsx is returned to be rendered to the screen
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';

// 17.17 now import the redux connect method to hook up the submitphoto method
import { connect } from 'react-redux'
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../../userActions';
import { toastr } from 'react-redux-toastr';

// 17.19 import firestoreConnect to connect this component to the firestore
// and import compose to add multiple higher order components to this component.
// check to bottom of the page to see configuration.
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import UserPhotos from './UserPhotos';

const mapDispatchToProps = {
    uploadProfileImage,
    deletePhoto,
    setMainPhoto
}

// 17.20 get the redux state from our store so we can have access
// to the user profile image and the auth
const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
})
// 17.20 Query gets the photo url from firestore
// everything is hooked up at the bottom of this page 
// where connect the component to redux store
// now that this component has access to the store where we hold our images
// Wen can now display them for the user. Create UserPhotos.jsx component
const query = ({ auth }) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            storeAs: 'photos'
        }
    ]
}

// 17.6 we are going to convert this compone to a normal functional component
// so we can use react hooks
const PhotosPage = ({ uploadProfileImage, photos, profile, deletePhoto, setMainPhoto, loading }) => {
    // 17.7 below is how we use the setState react hook. We are setting the state
    // to an empty array. The state is called files and the setStae method is called
    // setFiles. Next pass the setFiles method into our DropzoneInput component
    // next head to DropzoneInput;
    const [files, setFiles] = useState([]);

    //17.14 we can save the new cropped image into this state and we can pass down
    // the image preview in files state and the setImage into cropperInput component
    const [image, setImage] = useState(null);
    // 17.15 now we are going to create the button and methods to submit the 
    // cropped image. head to userActions.js

    // 17.11 below cleans up the objectURL saved in memory
    // because we are using a hook we have to specify our dependencies
    // so we pass file into an array at the end so the useEffect method has access to files state
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const handleUploadImage = async () => {
        try {
            await uploadProfileImage(image, files[0].name);
            handleCancelCrop();
            toastr.success('Success', 'Photo had been uploaded')
        } catch (error) {
            console.log(error);
            toastr.err('Oops', 'Something went wrong')
        }
    }

    const handleCancelCrop = () => {
        setFiles([]);
        setImage(null);
    }

    // 17.25 now we are going to write a handle method to delete a photo
    // once we import deltePhoto method and hook it up to the mapDispatchToProps
    // we can pass it into UserPhotos component 
    const handleDeletePhoto = async (photo) => {
        try {
            await deletePhoto(photo)
        }
        catch (error) {
            toastr.error('Ooops', error.message)
        }
    }

    const handleSetMainPhoto = async (photo) => {
        try {
            await setMainPhoto(photo);
        }
        catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    return (
        <Segment>
            <Header dividing size='large' content='Your Photos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <DropzoneInput setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length > 0 &&
                        <CropperInput setImage={setImage} imagePreview={files[0].preview} />}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 &&
                        <Fragment>
                            {/* // 17.12 can be found in CropperInput.jsx */}
                            <div
                                className='img-preview'
                                style={{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }}
                            />
                            <Button.Group>
                                <Button 
                                    loading={loading}
                                    onClick={handleUploadImage} 
                                    style={{ width: '100px' }} 
                                    positive 
                                    icon='check' 
                                />
                                <Button 
                                    disabled={loading}
                                    // We are done with chapter 17. Now head to features/event/eventActions.js
                                    // for the start of chapter 18
                                    onClick={handleCancelCrop} 
                                    style={{ width: '100px' }} 
                                    icon='close' />
                                {/* 17.18 After testing the uploadPhoto method using the debugger in vs Code
                                    Check video #153
                                    Lets work on getting the uploaded photos to appear on the photos page
                                    by connecting to our redux store
                                    import react-redux-firebase
                                */}
                            </Button.Group>
                        </Fragment>
                    }
                </Grid.Column>

            </Grid>
            {/* 17.26 After we pass deletePhoto method head to UserPhotos
                to hook up the new method
            */}
            <UserPhotos 
                photos={photos} 
                profile={profile} 
                deletePhoto={handleDeletePhoto} 
                setMainPhoto={handleSetMainPhoto} 
            />
            <Divider />

        </Segment>
    );
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(auth => query(auth))
)(PhotosPage);

