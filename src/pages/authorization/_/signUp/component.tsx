import useRegister from "api/mutations/api/register";
import { Register_RequestBody } from "api/mutations/api/register/types";
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

export default function SignUpPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const dispatch = useDispatch<Dispatch>();
  const basePath = getBasePath(path);
  const register = useRegister();
  const history = useHistory();

  const { control, handleSubmit, formState, setError } =
    useForm<Register_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: Register_RequestBody) {
    register.mutate(
      {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          password: data.password,
          password2: data.password2,
          email: data.email,
        },
      },
      {
        onSuccess: (res) => {
          dispatch(userActions.login(res.data));
        },
        onError: (err) => {
          if (err.response?.data.email) {
            setError("email", {
              message: err.response.data.email[0],
            });
          }
          if (err.response?.data.first_name) {
            setError("first_name", {
              message: err.response.data.first_name[0],
            });
          }
          if (err.response?.data.last_name) {
            setError("last_name", {
              message: err.response.data.last_name[0],
            });
          }
          if (err.response?.data.username) {
            setError("username", {
              message: err.response.data.username[0],
            });
          }
          if (err.response?.data.password) {
            setError("password", {
              message: err.response.data.password[0],
            });
          }
          if (err.response?.data.password2) {
            setError("password2", {
              message: err.response.data.password2[0],
            });
          }
        },
      }
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
          <Field
            name="username"
            control={control}
            fullWidth
            label={t("actions.username.title")}
            placeholder={t("actions.username.press")}
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <Field
            name="email"
            control={control}
            fullWidth
            label={t("actions.email.title")}
            placeholder={t("actions.email.press")}
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <div className="authorization--form-submit">
            <Field
              name="password"
              control={control}
              type="password"
              fullWidth
              label={t("actions.password.title")}
              placeholder={t("actions.password.press")}
              readonly={formState.isSubmitted}
              rules={{
                required: tRules("required"),
              }}
            />
            <Field
              name="password2"
              control={control}
              type="password"
              fullWidth
              placeholder={t("actions.repeatPassword.press")}
              readonly={formState.isSubmitted}
              rules={{
                required: tRules("required"),
              }}
            />
          </div>
          <Field
            name="first_name"
            control={control}
            fullWidth
            label={t("actions.firstname.title")}
            placeholder={t("actions.firstname.press")}
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <Field
            name="last_name"
            control={control}
            fullWidth
            label={t("actions.lastname.title")}
            placeholder={t("actions.lastname.press")}
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <div className="authorization--form-submit">
            <Button
              size="big"
              label={t("actions.register")}
              fullWidth
              type="submit"
            />
            <p className="authorization--description">{t("police")}</p>
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
          onClick={() => history.push(basePath + "/sign-in")}
        />
      </div>
    </div>
  );
}
