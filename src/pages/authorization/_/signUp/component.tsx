import useRegister from "api/mutations/api/register";
import { Register_RequestBody } from "api/mutations/api/register/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import "../styles.scss";

export default function SignUpPage() {
  const { t } = useTranslation("p_authorization");

  const register = useRegister();
  const history = useHistory();

  const { control, handleSubmit, formState } = useForm<Register_RequestBody>({
    mode: "onSubmit",
  });

  function onValidSubmit(data: Register_RequestBody) {
    console.log(data);
  }

  return (
    <div className="page-container authorization">
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
          />
          <Field
            name="email"
            control={control}
            fullWidth
            label={t("actions.email.title")}
            placeholder={t("actions.email.press")}
            readonly={formState.isSubmitted}
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
            />
            <Field
              name="password2"
              control={control}
              type="password"
              fullWidth
              placeholder={t("actions.repeatPassword.press")}
              readonly={formState.isSubmitted}
            />
          </div>
          <Field
            name="first_name"
            control={control}
            fullWidth
            label={t("actions.firstname.title")}
            placeholder={t("actions.firstname.press")}
            readonly={formState.isSubmitted}
          />
          <Field
            name="last_name"
            control={control}
            fullWidth
            label={t("actions.lastname.title")}
            placeholder={t("actions.lastname.press")}
            readonly={formState.isSubmitted}
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
          onClick={() => history.push("/sign-in")}
        />
      </div>
    </div>
  );
}
