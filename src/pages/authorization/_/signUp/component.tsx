import useRegister from "api/register/mutations";
import { Register_ErrorBody, Register_RequestBody } from "api/register/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { splitKey } from "utils/constant.utils";
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
  const history = useHistory();
  const dispatch = useDispatch<Dispatch>();

  const { accessToken } = useSelector(user_selector);
  const register = useRegister();

  const { control, handleSubmit, formState, setError } =
    useForm<Register_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: Register_RequestBody) {
    if (accessToken) {
      dispatch(userActions.logout());
    }

    register.mutate(
      {
        data: data,
      },
      {
        onSuccess: (res) => {
          toast.success(res.data.message, { duration: 5000 });
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
              readonly={formState.isSubmitting || register.isLoading}
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
              isLoading={register.isLoading}
              disabled={register.isLoading}
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
