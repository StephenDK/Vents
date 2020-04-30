import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

// 12.27 the inverted set to true gives us an opacity
const loadingComponent = ({inverted = true}) => {
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content='Loading...'/>
        </Dimmer>
    )
}

export default loadingComponent;
// 12.28 head to the event dashboard to use this component