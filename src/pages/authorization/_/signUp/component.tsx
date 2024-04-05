import useRegister from "api/mutations/api/register";
import {
  Register_ErrorBody,
  Register_RequestBody,
} from "api/mutations/api/register/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { getBasePath } from "utils/router.utils";

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
          password_confirm: data.password_confirm,
          email: data.email,
        },
      },
      {
        onSuccess: () => {
          history.push("/auth/sign-in");
        },
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
      }
    );
  }

  function splitKey(key: string) {
    return key.split("_").join("");
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
              readonly={formState.isSubmitted}
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
