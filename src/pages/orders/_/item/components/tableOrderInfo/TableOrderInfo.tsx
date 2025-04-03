import React from "react";
import { useTranslation } from "react-i18next";

import { AdGet } from "@/api/ads/types";
import { dateWithMonthWord, getFullDate } from "@/utils/util";
import "../../../styles.scss";

export default function TableOrderInfo(dataOrderItem: AdGet) {
  const { t } = useTranslation("p_orders", { keyPrefix: "pages.item.table" });
  return (
    <table className="page-orders__order-info_table">
      <tbody>
        <tr>
          <td title={t("orderNumber")}>{t("orderNumber")}</td>
          <td>{dataOrderItem.orderNumber}</td>
        </tr>
        <tr>
          <td title={t("type")}>{t("type")}</td>
          <td>{dataOrderItem.type.join(", ")}</td>
        </tr>
        <tr>
          <td title={t("category")}>{t("category")}</td>
          <td>{dataOrderItem.category.join(", ")}</td>
        </tr>
        <tr>
          <td title={t("budget")}>{t("budget")}</td>
          <td>{dataOrderItem.budget}</td>
        </tr>
        {dataOrderItem.deadlineEndAt && (
          <tr>
            <td title={t("deadlineEndAt")}>{t("deadlineEndAt")}</td>
            <td>
              {dateWithMonthWord(
                getFullDate(new Date(dataOrderItem.deadlineEndAt), true)
              )}
            </td>
          </tr>
        )}
        <tr>
          <td title={t("respondersLen")}>{t("respondersLen")}</td>
          <td>{dataOrderItem.responders?.length}</td>
        </tr>
      </tbody>
    </table>
  );
}
