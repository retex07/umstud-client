import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { PasswordResetConfirm_RequestBody } from "@/api/handlers/auth/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import urls from "@/services/router/urls";
import { ReactComponent as LineSvg } from "@/static/images/line.svg";
import { logout, reset } from "@/store/actions/auth";
import { selectAccessToken, selectIsLoading } from "@/store/selectors/auth";
import { getBasePath, useQuery } from "@/utils/router";
import "../styles.scss";

export default function ResetPage() {
  const { path } = useRouteMatch();
  const basePath = getBasePath(path);

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const uidb64 = query.get("uidb64");
  const token = query.get("token");

  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const isLoading = useSelector(selectIsLoading);
  const accessToken = useSelector(selectAccessToken);

  const { control, handleSubmit, formState, setError } =
    useForm<PasswordResetConfirm_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: PasswordResetConfirm_RequestBody) {
    if (accessToken) {
      dispatch(logout());
    }

    dispatch(
      reset({
        data,
        uidb64,
        token,
        onError: (err) => {
          if (err.response && err.response.data.error) {
            toast.error(err.response.data.error);
          }
          setError("new_password", {
            message: err.response?.data.confirm_password[0],
          });
          setError("confirm_password", {
            message: err.response?.data.confirm_password[0],
          });
        },
        onSuccess: () => {
          history.push(basePath + urls.auth.signIn);
        },
      })
    );
  }

  return (
    <div id="page" className="page-container authorization">
      <div className="authorization--wrapper">
        <h1 className="authorization--heading">{t("reset.title")}</h1>
        <form
          className="authorization--form-submit"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <Field
            name="new_password"
            type="password"
            control={control}
            fullWidth
            label={t(`actions.newpassword.title`)}
            placeholder={t(`actions.newpassword.press`)}
            readonly={formState.isSubmitting || isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Field
            name="confirm_password"
            type="password"
            control={control}
            fullWidth
            label={t(`actions.passwordconfirm.title`)}
            placeholder={t(`actions.passwordconfirm.press`)}
            readonly={formState.isSubmitting || isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.resetPassword")}
            isLoading={formState.isSubmitting || isLoading}
            disabled={formState.isSubmitting || isLoading}
          />
        </form>
        <Link to={basePath + "/sign-in"} className="authorization__link">
          {t("actions.remember")}
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
            onClick={() => history.push(basePath + "/sign-up")}
          />
          <p className="authorization--description">{t("police")}</p>
        </div>
      </div>
    </div>
  );
}
