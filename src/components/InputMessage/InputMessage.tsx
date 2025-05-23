import classNames from "classnames";
import React, { useRef, useEffect } from "react";

import Textarea, { Props as TextAreaProps } from "@/components/textarea";
import "./InputMessage.scss";

export default function InputMessage(props: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) {
      return;
    }

    ta.style.height = "auto";

    console.log(props.value);
    const contentHeight = ta.scrollHeight;

    const min = 36;
    const max = 133;

    const finalHeight = Math.min(Math.max(contentHeight, min), max);

    ta.style.height = finalHeight + "px";
  }, [props.value]);

  return (
    <Textarea
      {...props}
      innerRef={textareaRef}
      classNames={classNames("umstud-input-message", props.classNames)}
    />
  );
}
