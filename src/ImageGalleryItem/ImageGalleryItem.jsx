import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({img, getLargeImage})=> { 
  return img.map(el => (
    <li className="ImageGalleryItem" key={el.id}>
      <img
        src={el.webformatURL}
        alt={el.tag}
        className="ImageGalleryItem-image"
        id={el.id}
        key={el.id}
        onClick={()=>getLargeImage(el.largeImageURL)}
      />
    </li>
    )
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.array.isRequired,
  getLargeImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;