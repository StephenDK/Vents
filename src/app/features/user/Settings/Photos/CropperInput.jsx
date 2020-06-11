
//17.12 We begin to bring in the react-cropper module so we can
// let the user crop the photos they input
// boilerplate component found at: https://github.com/roadmanfong/react-cropper
import React, { Component, createRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


class CropperInput extends Component {
    cropper = createRef();

    cropImage = () => {
        const {setImage} = this.props;
        if (typeof this.cropper.current.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.cropper.current.getCroppedCanvas().toBlob(blob => {
            console.log(blob);
            setImage(blob)
        }, 'image/jpeg')
    }

    render() {
        const { imagePreview } = this.props;
        return (
            <Cropper
                ref={this.cropper}
                src={imagePreview}
                style={{ height: 200, width: '100%' }}
                // What is pretty unique is that the preview attribute below
                // looks for an element with the class of img-preview
                // that is what it hooks onto to display the preview image
                preview='.img-preview'
                // 17.13 We have to add another peice of state to hold the newly cropped image
                // head over to the imagepage.jsx
                aspectRatio={1}
                viewMode={1}
                drageMode='move'
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage} />
        );
    }
}

export default CropperInput;