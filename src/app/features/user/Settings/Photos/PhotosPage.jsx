// 17.2 snippet for photopage s_17.2.1
// This is the basic setup for our photos page
// head over to DropzoneInput.jsx to setup the DropzoneInput hook
import React, { useState, useEffect, Fragment } from 'react';
// 17.10 we need one more hook called useEffect. What ever we pass to use effect 
// will run after the jsx is returned to be rendered to the screen
import { Image, Segment, Header, Divider, Grid, Button, Card } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';

// 17.17 now import the redux connect method to hook up the submitphoto method
import { connect } from 'react-redux'
import { uploadProfileImage } from '../../userActions';
import { toastr } from 'react-redux-toastr';

// 17.19 import firestoreConnect to connect this component to the firestore
// and import compose to add multiple higher order components to this component.
// check to bottom of the page to see configuration.
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const mapDispatchToProps = {
    uploadProfileImage
}

// 17.20 get the redux state from our store so we can have access
// to the user profile image and the auth
const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
})

const query = ({auth}) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos'}],
            storeAs: 'photos'
        }
    ]
}

// 17.6 we are going to convert this compone to a normal functional component
// so we can use react hooks
const PhotosPage = ({ uploadProfileImage }) => {
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
                                <Button onClick={handleUploadImage} style={{ width: '100px' }} positive icon='check' />
                                <Button onClick={handleCancelCrop} style={{ width: '100px' }} icon='close' />
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

            <Divider />
            <Header sub color='teal' content='All Photos' />

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
                    <Button positive>Main Photo</Button>
                </Card>

                <Card >
                    <Image
                        src='https://randomuser.me/api/portraits/men/20.jpg'
                    />
                    <div className='ui two buttons'>
                        <Button basic color='green'>Main</Button>
                        <Button basic icon='trash' color='red' />
                    </div>
                </Card>
            </Card.Group>
        </Segment>
    );
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(auth => query(auth))
)(PhotosPage);

