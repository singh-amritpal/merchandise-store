import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
    const imageURL = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/4271933/pexels-photo-4271933.jpeg?cs=srgb&dl=pexels-alleksana-4271933.jpg&fm=jpg`;

    return (
        <div className="rounded border border-success p-2">
            <img src={imageURL} alt="sample" style={{ maxHeight: "100%", maxWidth: "100%" }} className="rounded" />
        </div>
    );
}

export default ImageHelper;
