import React, { Fragment } from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

const UserPhotos = ({ photos, profile, deletePhoto }) => {
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
                    <Image src={profile.photoURL} />
                    <Button positive>Main Photo</Button>
                </Card>
                {photos && filteredPhotos.map(photo => (
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                        <div className='ui two buttons'>
                            <Button basic color='green'>Main</Button>
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
