import useLogin from "api/mutations/api/login";
import { Login_RequestBody } from "api/mutations/api/login/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { getBasePath } from "utils/router.utils";
import "../styles.scss";

export default function SignInPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const dispatch = useDispatch<Dispatch>();
  const basePath = getBasePath(path);
  const login = useLogin();
  const history = useHistory();

  const { control, handleSubmit, formState, setError } =
    useForm<Login_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: Login_RequestBody) {
    login.mutate(
      {
        data: {
          login_or_email: data.login_or_email,
          password: data.password,
        },
      },
      {
        onSuccess: (res) => {
          dispatch(userActions.login({ ...res.data.tokens }));
        },
        onError: (err) => {
          if (err.response?.data.message) {
            setError("login_or_email", {
              message: err.response.data.message,
            });
            setError("password", {
              message: err.response.data.message,
            });
          }
        },
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
        >
          <Field
            name="login_or_email"
            control={control}
            fullWidth
            label={t("actions.email.title")}
            placeholder={t("actions.email.press")}
            readonly={formState.isSubmitted}
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
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.login")}
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
