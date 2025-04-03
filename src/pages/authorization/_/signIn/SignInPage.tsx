import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { Login_RequestBody } from "@/api/handlers/auth/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import urls from "@/services/router/urls";
import { ReactComponent as LineSvg } from "@/static/images/line.svg";
import { login, logout } from "@/store/actions/auth";
import { selectAccessToken, selectIsLoading } from "@/store/selectors/auth";
import { getBasePath } from "@/utils/router";
import "../styles.scss";

export default function SignInPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const dispatch = useDispatch();
  const basePath = getBasePath(path);
  const history = useHistory();

  const accessToken = useSelector(selectAccessToken);
  const isLoading = useSelector(selectIsLoading);

  const { control, handleSubmit, formState, setError } =
    useForm<Login_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: Login_RequestBody) {
    if (accessToken) {
      dispatch(logout());
    }

    dispatch(
      login({
        data,
        onError: (err) => {
          const errors = err.response?.data;
          if (errors) {
            setError("login_or_email", {
              message: errors["login_or_email"]?.[0],
            });
            setError("password", {
              message: errors["password"]?.[0],
            });
          }
        },
      })
    );
  }

  return (
    <div id="page" className="page-container authorization">
      <div className="authorization--wrapper">
        <h1 className="authorization--heading">{t("login.title")}</h1>
        <form
          className="authorization--form-submit"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <Field
            name="login_or_email"
            control={control}
            fullWidth
            label={t("actions.loginOrEmail.title")}
            placeholder={t("actions.loginOrEmail.press")}
            readonly={formState.isSubmitting || isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Field
            name="password"
            control={control}
            fullWidth
            type="password"
            label={t("actions.password.title")}
            placeholder={t("actions.password.press")}
            readonly={formState.isSubmitting || isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            label={t("actions.login")}
          />
        </form>
        <Link to={basePath + urls.auth.recover} className="authorization__link">
          {t("actions.recover")}
        </Link>
        <div className="authorization--actions">
          <LineSvg />
          <p className="authorization--action-text">{t("actions.or")}</p>
          <LineSvg />
        </div>
        <div className="authorization--form-submit">
          <Button
            size="big"
            label={t("actions.register")}
            fullWidth
            isTransparent
            onClick={() => history.push(basePath + urls.auth.signUp)}
          />
          <p className="authorization--description">{t("police")}</p>
        </div>
      </div>
    </div>
  );
}
