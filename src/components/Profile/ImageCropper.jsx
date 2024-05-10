import React, { useRef, useState} from 'react';
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
  } from "react-image-crop";
import setCanvasPreview from '../../setCanvasPreview';


const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, modalIsOpen }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const imageElement = new Image();
          const imageUrl = reader.result?.toString() || "";
          imageElement.src = imageUrl;
    
          imageElement.addEventListener("load", (e) => {
            if (error) setError("");
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
              setError("Изображение должно быть размером не менее 150 x 150 пикселей.");
              return setImgSrc("");
            }
          });
          setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    
        const crop = makeAspectCrop(
          {
            unit: "%",
            width: cropWidthInPercent,
          },
          ASPECT_RATIO,
          width,
          height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <>
        {modalIsOpen && (
            <div className="modal">
                <div className="cropper">
                    <div className="cropper__close" onClick={() => closeModal()}>&times;</div>
                    <div className="cropper__header">
                        <h3 className="cropper__h3">Обновить фото</h3>
                    </div>
                    <div className="cropper__body">
                        <input
                            type="file"
                            className="cropper__input"
                            accept="image/png, image/jpeg"
                            onChange={onSelectFile} />
                        {error && <p className="text-red-400 text-xs">{error}</p>}
                        {imgSrc && (
                            <div className="cropper__content">
                                <ReactCrop
                                    crop={crop}
                                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                                    circularCrop
                                    keepSelection
                                    aspect={ASPECT_RATIO}
                                    minWidth={MIN_DIMENSION}
                                >
                                    <img
                                        ref={imgRef}
                                        src={imgSrc}
                                        alt="Upload"
                                        style={{ maxHeight: "70vh" }}
                                        onLoad={onImageLoad}
                                    />
                                </ReactCrop>
                                <button
                                    className="cropper__btn btn"
                                    onClick={() => {
                                        setCanvasPreview(
                                            imgRef.current,
                                            previewCanvasRef.current,
                                            convertToPixelCrop(
                                                crop,
                                                imgRef.current.width,
                                                imgRef.current.height
                                            )
                                        );
                                        let arr = imgRef.current.src.split(','),
                                            mime = arr[0].match(/:(.*?);/)[1];
                                        const dataUrl = previewCanvasRef.current.toDataURL(mime);
                                        updateAvatar(dataUrl);
                                        closeModal();
                                    }}
                                >
                                    Вырезать
                                </button>
                            </div>
                        )}
                        {crop && (
                            <canvas
                                ref={previewCanvasRef}
                                className="cropper__preview"
                            />
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default ImageCropper;