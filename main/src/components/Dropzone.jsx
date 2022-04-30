import React from 'react';
import {useDropzone} from 'react-dropzone';
import {uploadImage} from "../firebase/image";
import { connect } from "react-redux";

function Dropzone({userInfo}) {
  const { getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (files) => {
      uploadImage(files,"This is description", userInfo.uid)
    }
  });

  return (
    <section className="dropzone_container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button className="btn">click to select files</button>
      </div>
    </section>
  );
}

const mapsStateToProps = (state) => ({...state});

export default connect(mapsStateToProps)(Dropzone);