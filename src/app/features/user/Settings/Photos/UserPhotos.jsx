import React, { Fragment } from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

const UserPhotos = ({ photos, profile, deletePhoto, setMainPhoto }) => {
    let filteredPhotos;
    if (photos) {
        filteredPhotos = photos.filter(photo => {
            return photo.url !== profile.photoURL
        })
    }
    return (
        <Fragment>
            <Header sub color='teal' content='All Photos' />

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={profile.photoURL || '/assets/user.png'} />
                    <Button positive>Main Photo</Button>
                </Card>
                {photos && filteredPhotos.map(photo => (
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                        <div className='ui two buttons'>
                            <Button onClick={() => setMainPhoto(photo)} basic color='green'>Main</Button>
                            {/* 17.27 Now that we have to deletePhoto method hooked up
                                we will go and setup the Main button to let the user select their 
                                main photo. Head over to userActions.js
                            */}
                            <Button onClick={() => deletePhoto(photo)} basic icon='trash' color='red' />
                        </div>
                    </Card>
                ))}
            </Card.Group>
        </Fragment >
    )
}

// 17.21 Now we have to fix the problem of users uplaoding images 
// with the same name. When this happends firebase writes over the 
// image with the same name. Head over to userActions.js to fix the problem


export default UserPhotos
