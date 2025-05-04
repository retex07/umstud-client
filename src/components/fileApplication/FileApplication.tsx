import React from "react";

import { Message } from "@/api/handlers/chat/types";
import { ReactComponent as FileSvg } from "@/static/images/file.svg";
import "./FileApplication.scss";

export default function FileApplication(
  props: Pick<
    Message,
    "file" | "original_filename" | "mime_type" | "formatted_file_size"
  >
) {
  if (!props.file) {
    return null;
  }

  if (props.mime_type?.includes("image")) {
    return (
      <img
        className="file-application-img"
        src={props.file}
        alt={props.original_filename}
      />
    );
  }

  return (
    <a
      href={props.file}
      target="_blank"
      className="file-application"
      rel="noreferrer"
    >
      <FileSvg />
      <div className="file-application_content">
        <h4 className="file-application_head">{props.original_filename}</h4>
        <div className="file-application__info">
          <p className="file-application_description">
            {props.original_filename?.split(".").pop()?.toUpperCase()}
          </p>
          {!!props.formatted_file_size && (
            <>
              <span className="file-application_description">-</span>
              <span className="file-application_description">
                {props.formatted_file_size}
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
