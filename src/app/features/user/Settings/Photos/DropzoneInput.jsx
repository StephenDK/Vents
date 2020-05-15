import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react';

// 17.3 in this file we are using the react hook useDropZone
const DropzoneInput = ({setFiles}) => {
  const onDrop = useCallback(acceptedFiles => {
    // 17.8 we will destructor the setFiles method from photospage then 
    // instead of logging the files to console we will set photospage state
    // console.log(acceptedFiles);
    // because onDrop is a callback function we have to pass setFiles
    // into the empty array below
    // 17.9 Below we are mapping over the accepted files array and returning 
    // a new object with a preview key. Object.assign returns a new object called file
    // with the sourses we specify. createObjectURL takea a url and parses it into a DOMstring
    // the problem with this is it saves it in memory. Head to photospage to see how to remove from memory
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, [setFiles])
  // 17.3. We are destructoring some props we get from dropzone
  // and this gives us access to some root properties
  // head back to the photos page and import this component 
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    // 17.4 we only want to user to add one image at a time so we are
    // going to specify some properties
    onDrop,
    multiple: false,
    accept: 'image/*'
  })

  return (
    <div {...getRootProps()} className={'dropzone ' + (isDragActive && 'dropzone--isActive')}>
      <input {...getInputProps()} />
      {/* 17.5 creating the layout and styles for the drop area.
        head over to index.css to change styles.
        Now were going to use react hooks to store the photo instead of log to console
        head to PhotosPage to setup react hooks instead of using a class component
      */}
      <Icon name='upload' size='huge'/>
      <Header content='Drop Image Here' />
    </div>
  )
}

export default DropzoneInput;