import { useState } from "react";
import Photo from '../../assets/images/photo.png'

const ImageUploader = ({setImageString}) => {
    const [image, setImage] = useState(null);

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setImageString(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        setImage(reader.result);
        getBase64(file)
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleClick = () => {
      document.getElementById('fileInput').click();
    };
  
    return (
      <div>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <img
          src={image || Photo}
          alt="Uploaded"
          style={{ width: '200px', height: '200px', cursor: 'pointer' }}
          onClick={handleClick}
        />
      </div>
    );
  };
  
export default ImageUploader;