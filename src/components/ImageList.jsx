import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

function ImageList({images}){
    return (
        <div className="col-12 p-5 row">
            {images.map(image => {
                const { id } = image
                return(
                    <Image key={id} image={image}/>
                )
            })}
        </div>
    );
};

Image.propTypes = {
    images: PropTypes.array,
};

export default ImageList;