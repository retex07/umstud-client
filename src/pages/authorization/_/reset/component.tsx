import { useReset } from "api/reset/mutations/reset";
import { PasswordResetConfirm_RequestBody } from "api/reset/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { getBasePath, useQuery } from "utils/router.utils";
import "../styles.scss";

export default function ResetPage() {
  const { path } = useRouteMatch();
  const basePath = getBasePath(path);

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch<Dispatch>();

  const uidb64 = query.get("uidb64");
  const token = query.get("token");

  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const { accessToken } = useSelector(user_selector);
  const reset = useReset(uidb64 || "", token || "");

  const { control, handleSubmit, formState, setError } =
    useForm<PasswordResetConfirm_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: PasswordResetConfirm_RequestBody) {
    if (accessToken) {
      dispatch(userActions.logout());
    }

    reset.mutate(
      { data: data },
      {
        onSuccess: (res) => {
          toast.success(res.data.message, { duration: 5000 });
          history.push("/auth/sign-in");
        },
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
      }
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
            readonly={formState.isSubmitting || reset.isLoading}
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
            readonly={formState.isSubmitting || reset.isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.resetPassword")}
            isLoading={formState.isSubmitting || reset.isLoading}
            disabled={formState.isSubmitting || reset.isLoading}
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
