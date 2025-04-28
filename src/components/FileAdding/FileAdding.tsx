import classNames from "classnames";
import React, { ChangeEvent, useRef } from "react";

import { ReactComponent as PlusSvg } from "@/static/images/plus.svg";
import "./FileAdding.scss";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  countUploadedFiles?: number;
}

export default function FileAdding(props: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isBlockedUpload =
    props.countUploadedFiles && props.countUploadedFiles !== 0;

  const triggerFileInput = () => {
    if (!isBlockedUpload) {
      if (fileInputRef && fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  return (
    <div className={classNames("file-adding", { blocked: isBlockedUpload })}>
      <input type="file" ref={fileInputRef} onChange={props.onChange} hidden />
      <div className="file-adding_btn" onClick={triggerFileInput}>
        {!!props.countUploadedFiles && (
          <span className="file-adding__count-files">
            {props.countUploadedFiles}
          </span>
        )}
        <PlusSvg />
      </div>
    </div>
  );
}
