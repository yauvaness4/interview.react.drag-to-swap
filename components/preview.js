import React from 'react';
import styled from 'styled-components';

const Preview = styled.div`
border-radius: 50%;
border: 5px #ffffff solid;
height: 100px;
overflow: hidden;
width: 100px;

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
`

const PhotoPreview = ({ image, preview }) => {
    return (
        preview ?
            (<Preview>
                <img src={image} alt="preview" />
            </Preview>)
            : <img src={image} alt="" />
    )
}

export default PhotoPreview;