import Button from "components/button";
import Input from "components/input";
import Modal from "components/modal";
import throttle from "lodash/throttle";
import React, { useState, useRef, RefObject, useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ReactCrop, Crop } from "react-image-crop";
import { blobToFile } from "utils/formdata.utils";
import "./styles.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (file: File) => void;
  innerRef?: RefObject<HTMLInputElement>;
}

export default function ImgEditor(props: Props) {
  const { t } = useTranslation("c_imgEditor");

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "px",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledUpdatePreview = useCallback(
    throttle((newCrop) => {
      if (imgRef.current && newCrop.width && newCrop.height) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const scale = imgRef.current.naturalWidth / imgRef.current.width;
        canvas.width = newCrop.width * scale;
        canvas.height = newCrop.height * scale;

        if (
          ctx &&
          imgRef.current.complete &&
          imgRef.current.naturalWidth !== 0
        ) {
          ctx.drawImage(
            imgRef.current,
            newCrop.x * scale,
            newCrop.y * scale,
            newCrop.width * scale,
            newCrop.height * scale,
            0,
            0,
            newCrop.width * scale,
            newCrop.height * scale
          );

          canvas.toBlob((blob) => {
            if (blob) {
              if (imageSrc) URL.revokeObjectURL(imageSrc);
              setImgPreview(URL.createObjectURL(blob));
            }
          }, props.innerRef?.current?.files?.[0]?.type || "image/jpeg");
        }
      }
    }, 250),
    [imageSrc]
  );

  function handleOnCropChange(newCrop: Crop) {
    const size = Math.min(newCrop.width, newCrop.height);
    setCrop({
      ...newCrop,
      width: size,
      height: size,
    });

    throttledUpdatePreview(newCrop);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    if (imgRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scale = imgRef.current.naturalWidth / imgRef.current.width;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      canvas.width = crop.width * scale;
      canvas.height = crop.height * scale;
      ctx.drawImage(
        imgRef.current,
        crop.x * scale,
        crop.y * scale,
        crop.width * scale,
        crop.height * scale,
        0,
        0,
        crop.width * scale,
        crop.height * scale
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const file = props.innerRef?.current?.files?.[0];
          if (file) {
            props.handleChange(blobToFile(blob, file.name, file.type));
          } else {
            props.handleChange(blobToFile(blob));
          }
          props.onClose();
          toast(t("infoSave"));
        }
      }, props.innerRef?.current?.files?.[0]?.type || "image/jpeg");
    } else {
      toast.error(t("errorSave"));
    }
  }

  function triggerClick() {
    if (props.innerRef && props.innerRef.current) {
      props.innerRef.current.click();
    }
  }

  function onImageLoaded() {
    handleOnCropChange({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      unit: "px",
    });
  }

  function renderActions() {
    return (
      <>
        <Button fullWidth onClick={handleSave} label={t("save")} />
        <Button
          isTransparent
          fullWidth
          onClick={props.onClose}
          label={t("cancel")}
        />
      </>
    );
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={t("titleModal")}
    >
      <div className="img-editor">
        <div className="img-editor__first-block">
          <Input
            textPosition="center"
            innerRef={props.innerRef}
            fullWidth
            name="photo"
            type="file"
            onChange={onFileChange}
            onClick={triggerClick}
            accept="image/*"
            placeholder={t("filePress")}
            required
          />
          {imgPreview && (
            <div className="img-editor__preview">
              <h3 className="img-editor__block-title">{t("preview")}</h3>
              <img
                className="img-editor__preview-img"
                ref={imgRef}
                src={imgPreview || ""}
                alt="preview"
              />
            </div>
          )}
          <div className="img-editor__actions">{renderActions()}</div>
        </div>
        {imageSrc && (
          <div className="img-editor__crop">
            <h3 className="img-editor__block-title">{t("editCrop")}</h3>
            <ReactCrop
              style={{ width: "100%", maxWidth: "320px" }}
              crop={crop}
              onChange={handleOnCropChange}
            >
              <img
                onLoad={onImageLoaded}
                ref={imgRef}
                src={imageSrc}
                alt="cropping"
              />
            </ReactCrop>
          </div>
        )}
        <div className="img-editor__actions-mobile">{renderActions()}</div>
      </div>
    </Modal>
  );
}
