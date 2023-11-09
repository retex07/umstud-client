import useLogin from "api/mutations/api/login";
import { Login_RequestBody } from "api/mutations/api/login/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { getBasePath } from "utils/router.utils";
import "../styles.scss";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("p_authorization");
  const { path } = useRouteMatch();

  const basePath = getBasePath(path);
  const login = useLogin();
  const history = useHistory();

  const { control, handleSubmit, formState, reset, setError } =
    useForm<Login_RequestBody>({
      reValidateMode: "onSubmit",
    });

  function onValidSubmit(data: Login_RequestBody) {
    setIsLoading(true);
    login.mutate(
      {
        data: {
          login: data.login,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          reset();
        },
        onError: (err) => setError("login", { message: err.message }),
      }
    );
  }

  return (
    <div id="page" className="page-container authorization">
      <div className="authorization--wrapper">
        <h1 className="authorization--heading">{t("login.title")}</h1>
        <form
          className="authorization--form-submit"
          onSubmit={handleSubmit(onValidSubmit)}
          onReset={() => reset()}
        >
          <Field
            name="login"
            control={control}
            fullWidth
            label={t("actions.email.title")}
            placeholder={t("actions.email.press")}
            readonly={formState.isSubmitted}
          />
          <Field
            name="password"
            control={control}
            fullWidth
            type="password"
            label={t("actions.password.title")}
            placeholder={t("actions.password.press")}
            readonly={formState.isSubmitted}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.login")}
            isLoading={isLoading}
          />
        </form>
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
            onClick={() => history.push(basePath + "/sign-up")}
          />
          <p className="authorization--description">{t("police")}</p>
        </div>
      </div>
    </div>
  );
}
