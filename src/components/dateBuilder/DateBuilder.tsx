import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as CalendarSvg } from "@/static/images/calendar.svg";
import { ReactComponent as ChevronRightSvg } from "@/static/images/chevron-right.svg";
import "./DateBuilder.scss";

interface Props {
  dateStartAt?: string;
  dateEndAt?: string;
  isClosed?: boolean;
  isNotViewEndDate?: boolean;
}

export default function DateBuilder(props: Props) {
  const { t } = useTranslation("c_dateBuilder");

  return (
    <div className="date-builder">
      {!props.isClosed && (
        <>
          <div className="date-builder--item">
            <CalendarSvg />
            <span className="date-builder--item start">
              {props.dateStartAt}
            </span>
          </div>
          {!props.isNotViewEndDate && <ChevronRightSvg />}
        </>
      )}
      {props.isClosed && (
        <span className="card-task--closed">{t("closed")}</span>
      )}
      {!props.isNotViewEndDate && (
        <div className="date-builder--item">
          <CalendarSvg />
          <span className="date-builder--item end">{props.dateEndAt}</span>
        </div>
      )}
    </div>
  );
}
