import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import {
  Register_ErrorBody,
  Register_RequestBody,
} from "@/api/handlers/auth/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import urls from "@/services/router/urls";
import { ReactComponent as LineSvg } from "@/static/images/line.svg";
import { logout, register } from "@/store/actions/auth";
import { selectAccessToken, selectIsLoading } from "@/store/selectors/auth";
import { getBasePath } from "@/utils/router";
import { splitKey } from "@/utils/util";
import "../styles.scss";

export default function SignUpPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  type KeysOfRegister_RequestBody = keyof Register_RequestBody;
  const keysRegisterRequest: KeysOfRegister_RequestBody[] = [
    "username",
    "email",
    "password",
    "password_confirm",
    "first_name",
    "last_name",
  ];

  const basePath = getBasePath(path);
  const history = useHistory();
  const dispatch = useDispatch();

  const accessToken = useSelector(selectAccessToken);
  const isLoading = useSelector(selectIsLoading);

  const { control, handleSubmit, formState, setError } =
    useForm<Register_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: Register_RequestBody) {
    if (accessToken) {
      dispatch(logout());
    }

    dispatch(
      register({
        data,
        onError: (err) => {
          if (err.response) {
            Object.entries(err.response.data).map(([key, value]) => {
              const typedKey = key as keyof Register_ErrorBody;
              setError(typedKey, {
                message: value[0],
              });
            });
          }
        },
        onSuccess: () => history.push(basePath + urls.auth.signIn),
      })
    );
  }

  return (
    <div id="page" className="page-container authorization">
      <div className="authorization--wrapper">
        <h1 className="authorization--heading">{t("register.title")}</h1>
        <form
          className="authorization--form-submit"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          {keysRegisterRequest.map((key) => (
            <Field
              key={key}
              name={key}
              type={
                key === "password" || key === "password_confirm"
                  ? "password"
                  : "text"
              }
              control={control}
              fullWidth
              label={t(`actions.${splitKey(key)}.title`)}
              placeholder={t(`actions.${splitKey(key)}.press`)}
              readonly={formState.isSubmitting || isLoading}
              rules={{
                required: tRules("required"),
              }}
            />
          ))}
          <div className="authorization--form-submit">
            <Button
              size="big"
              label={t("actions.register")}
              fullWidth
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <p className="authorization--description">
              {t("policy.title")}{" "}
              <a
                className="authorization__link description"
                href={urls.privacy}
              >
                {t("policy.document")}
              </a>
            </p>
          </div>
        </form>
        <div className="authorization--actions">
          <LineSvg />
          <p className="authorization--action-text">{t("actions.or")}</p>
          <LineSvg />
        </div>
        <Button
          size="big"
          fullWidth
          isTransparent
          label={t("actions.login")}
          onClick={() => history.push(basePath + urls.auth.signIn)}
        />
      </div>
    </div>
  );
}
