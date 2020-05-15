// 17.2 snippet for photopage s_17.2.1
// This is the basic setup for our photos page
// head over to DropzoneInput.jsx to setup the DropzoneInput hook
import React, {useState, useEffect} from 'react';
// 17.10 we need one more hook called useEffect. What ever we pass to use effect 
// will run after the jsx is returned to be rendered to the screen
import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';

// 17.6 we are going to convert this compone to a normal functional component
// so we can use react hooks
const  PhotosPage = () => {
    // 17.7 belo is how we use the setState react hook. We are setting the state
    // to an empty array. The state is called files and the setStae method is called
    // setFiles. Next pass the setFiles method into our DropzoneInput component
    // next head to DropzoneInput;
    const [files, setFiles] = useState([]);

    // 17.11 below cleans up the objectURL saved in memory
    // because we are using a hook we have to specify our dependencies
    // so we pass file into an array at the end so the useEffect method has access to files state
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Segment>
            <Header dividing size='large' content='Your Photos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo'/>
                    <DropzoneInput setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 &&
                      <Image src={files[0].preview} style={{minHeight: '200px', minWidth: '200px'}} />  
                    }
                </Grid.Column>

            </Grid>

            <Divider/>
            <Header sub color='teal' content='All Photos'/>

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
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

export default PhotosPage;