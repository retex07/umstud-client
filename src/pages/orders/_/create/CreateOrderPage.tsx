import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useCreateAd from "@/api/ads/mutations/create";
import useUpdateAd from "@/api/ads/mutations/edit";
import {
  AdCreate_FormBody,
  OptionSelect as OptionSelectAd,
  ValidKeysCreate,
} from "@/api/handlers/order/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import SelectField from "@/components/formElements/selectField";
import TextareaField from "@/components/formElements/textareaField";
import PageLoader from "@/components/loaders/pageLoader";
import { RegExp } from "@/constants/config";
import urls from "@/services/router/urls";
import { getCategoriesAndTypes, getOrder } from "@/store/actions/order";
import { selectAccessToken } from "@/store/selectors/auth";
import {
  selectCategories,
  selectIsLoadingOrderItem,
  selectOrderItem,
  selectTypes,
} from "@/store/selectors/order";
import { SelectOption } from "@/types/components";
import { checkToken } from "@/utils/user";
import { isMobileVersion } from "@/utils/util";
import "../styles.scss";

export default function CreateOrderPage() {
  const [isEditingOrder, setIsEditingOrder] = useState(false);

  const { t } = useTranslation("p_orders", { keyPrefix: "pages" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const params = useParams<{ orderId: string }>();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const token = useSelector(selectAccessToken);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const createOrder = useCreateAd();
  const updateOrder = useUpdateAd();

  useEffect(() => {
    if (
      !!params.orderId &&
      location.pathname.includes(
        urls.orders.index + urls.orders.edit.replace(":orderId", "")
      )
    ) {
      setIsEditingOrder(true);
      dispatch(getOrder(params.orderId));
    }

    dispatch(getCategoriesAndTypes());
  }, []);

  const dataOrderItemSelect = useSelector(selectOrderItem);
  const dataOrderItem = isEditingOrder ? dataOrderItemSelect : null;
  const isLoadingOrderItem = useSelector(selectIsLoadingOrderItem);
  const dataCategoriesAds = useSelector(selectCategories);
  const dataTypesAds = useSelector(selectTypes);

  const { control, handleSubmit, formState, setError, setValue } =
    useForm<AdCreate_FormBody>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataOrderItem?.type.length && dataTypesAds?.length) {
      const defaultTypes: SelectOption[] = [];

      dataOrderItem.type.forEach((type) => {
        const found = dataTypesAds.find((data) => data.name === type);

        if (found && found.id && found.name) {
          defaultTypes.push({ value: found.id, label: found.name });
        }
      });

      if (defaultTypes && defaultTypes[0]) {
        setValue("type", defaultTypes[0]);
      }
    }
  }, [dataOrderItem?.type, dataTypesAds, setValue]);

  useEffect(() => {
    if (dataOrderItem?.category.length && dataCategoriesAds?.length) {
      const defaultCategories: SelectOption[] = [];

      dataOrderItem.category.forEach((category) => {
        const found = dataCategoriesAds.find((data) => data.name === category);

        if (found && found.id && found.name) {
          defaultCategories.push({ value: found.id, label: found.name });
        }
      });

      if (defaultCategories && defaultCategories[0]) {
        setValue("category", defaultCategories[0]);
      }
    }
  }, [dataOrderItem?.category, dataCategoriesAds, setValue]);

  function backToOrders() {
    history.goBack();
  }

  function onValidSubmit(data: AdCreate_FormBody) {
    const type = [data.type.value];
    const category = [data.category.value];

    if (isEditingOrder) {
      updateOrder.mutate(
        {
          adId: Number(params.orderId),
          data: {
            ...data,
            deadlineEndAt: new Date(data.deadlineEndAt).toISOString(),
            category,
            type,
          },
        },
        {
          onSuccess: (res) => {
            toast.success(t("edit.actions.success"));
            if (res.data && res.data.id) {
              history.push(
                urls.orders.index +
                  urls.orders.item.replace(":orderId", res.data.id.toString())
              );
            } else {
              history.push(urls.orders.index);
            }
          },
          onError: (error) => {
            const errorData = error.response?.data;
            if (errorData) {
              Object.entries(errorData).forEach(([key, value]) => {
                setError(key as ValidKeysCreate, {
                  message: value[0] || "",
                });
              });
            }
          },
        }
      );
    } else {
      createOrder.mutate(
        {
          data: {
            ...data,
            deadlineEndAt: new Date(data.deadlineEndAt).toISOString(),
            category,
            type,
          },
        },
        {
          onSuccess: (res) => {
            toast.success(t("create.notifications.success"));
            if (res.data && res.data.id) {
              history.push(
                urls.orders.index +
                  urls.orders.item.replace(":orderId", res.data.id.toString())
              );
            } else {
              history.push(urls.orders.index);
            }
          },
          onError: (error) => {
            const errorData = error.response?.data;
            if (errorData) {
              Object.entries(errorData).forEach(([key, value]) => {
                setError(key as ValidKeysCreate, {
                  message: value[0] || "",
                });
              });
            }
          },
        }
      );
    }
  }

  function parseValueToSelect(value: OptionSelectAd[]) {
    const options: SelectOption[] = [];
    value.forEach((option) => {
      options.push({
        value: option.id,
        label: option.name,
      });
    });
    return options;
  }

  function blockPrevDate() {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toISOString().split("T")[0];
    }
  }

  if (!token) {
    checkToken(token, history);
  }

  if (isLoadingOrderItem) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-orders__order-create_header">
          <h3 className="page-content-title">
            {isEditingOrder ? t("edit.title") : t("create.title")}
          </h3>
          <span className="page-orders__actions_cancel" onClick={backToOrders}>
            {isEditingOrder
              ? t("edit.actions.cancel")
              : t("create.actions.cancel")}
          </span>
        </header>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="page-orders__order-create_form"
        >
          <Field
            name="title"
            control={control}
            fullWidth
            defaultValue={dataOrderItem?.title}
            label={t("create.fields.title.title")}
            placeholder={t("create.fields.title.press")}
            readonly={formState.isSubmitting || createOrder.isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <div className="page-orders__order-create_sub-fields">
            <SelectField
              classNames="page-orders__order-create_sub-fields_field"
              closeMenuOnSelect
              name="type"
              control={control}
              options={parseValueToSelect(dataTypesAds || [])}
              label={t("create.fields.type.title")}
              placeholder={t("create.fields.type.press")}
              isMulti={false}
              readOnly={formState.isSubmitting || createOrder.isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
            <SelectField
              classNames="page-orders__order-create_sub-fields_field"
              closeMenuOnSelect
              name="category"
              control={control}
              options={parseValueToSelect(dataCategoriesAds || [])}
              label={t("create.fields.category.title")}
              placeholder={t("create.fields.category.press")}
              isMulti={false}
              readOnly={formState.isSubmitting || createOrder.isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
            <Field
              innerRef={dateInputRef}
              classNames="page-orders__order-create_sub-fields_field"
              control={control}
              type="date"
              name="deadlineEndAt"
              label={t("create.fields.deadlineEndAt.title")}
              readonly={formState.isSubmitting || createOrder.isLoading}
              defaultValue={
                dataOrderItem?.deadlineEndAt
                  ? new Date(dataOrderItem?.deadlineEndAt)
                      .toISOString()
                      .split("T")[0]
                  : undefined
              }
              onClick={blockPrevDate}
              rules={{
                required: tRules("required"),
                pattern: {
                  value: RegExp.birth_date,
                  message: tRules(`pattern_deadlineEndAt`),
                },
              }}
            />
            <Field
              classNames="page-orders__order-create_sub-fields_field"
              control={control}
              type="number"
              name="budget"
              defaultValue={dataOrderItem?.budget}
              label={t("create.fields.budget.title")}
              placeholder={t("create.fields.budget.press")}
              readonly={formState.isSubmitting || createOrder.isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
          </div>
          <TextareaField
            name="description"
            control={control}
            label={t("create.fields.description.title")}
            placeholder={t("create.fields.description.press")}
            readonly={formState.isSubmitting || createOrder.isLoading}
            fullWidth
            defaultValue={dataOrderItem?.description}
            rules={{
              required: tRules("required"),
            }}
          />
          <div className="page-orders__actions-list">
            <Button
              classNames="page-orders__actions_btn"
              type="submit"
              color="green"
              fullWidth={isMobileVersion()}
              label={
                isEditingOrder
                  ? t("edit.actions.submit")
                  : t("create.actions.submit")
              }
            />
            <Button
              classNames="page-orders__actions_btn"
              fullWidth={isMobileVersion()}
              label={t("create.actions.addFile")}
            />
            <Button
              color="red"
              classNames="page-orders__actions_btn page-orders__actions_cancel_btn"
              fullWidth={isMobileVersion()}
              label={
                isEditingOrder
                  ? t("edit.actions.cancel")
                  : t("create.actions.cancel")
              }
              onClick={backToOrders}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
