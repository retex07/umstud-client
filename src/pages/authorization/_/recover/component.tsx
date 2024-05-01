import { useRecover } from "api/recover/mutations/recover";
import { PasswordReset_RequestBody } from "api/recover/types";
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
import { getBasePath } from "utils/router.utils";
import "../styles.scss";

export default function RecoverPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const basePath = getBasePath(path);
  const history = useHistory();
  const dispatch = useDispatch<Dispatch>();

  const { accessToken } = useSelector(user_selector);
  const recover = useRecover();

  const { control, handleSubmit, formState, setError } =
    useForm<PasswordReset_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: PasswordReset_RequestBody) {
    if (accessToken) {
      dispatch(userActions.logout());
    }

    recover.mutate(
      { data: data },
      {
        onSuccess: (res) => {
          toast.success(res.data.message, { duration: 5000 });
        },
        onError: (err) => {
          if (err.response && err.response.data.email) {
            setError("email", { message: err.response.data.email[0] });
          }
        },
      }
    );
  }

  return (
    <div id="page" className="page-container authorization">
      <div className="authorization--wrapper">
        <h1 className="authorization--heading">{t("recover.title")}</h1>
        <form
          className="authorization--form-submit"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <Field
            name="email"
            control={control}
            fullWidth
            label={t("actions.email.title")}
            placeholder={t("actions.email.press")}
            readonly={formState.isSubmitting || recover.isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.recoverAccess")}
            isLoading={recover.isLoading}
            disabled={recover.isLoading}
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
