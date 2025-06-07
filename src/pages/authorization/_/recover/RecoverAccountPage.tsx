import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { PasswordReset_RequestBody } from "@/api/handlers/auth/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import urls from "@/services/router/urls";
import { ReactComponent as LineSvg } from "@/static/images/line.svg";
import { logout, recover } from "@/store/actions/auth";
import { selectAccessToken, selectIsLoading } from "@/store/selectors/auth";
import { getBasePath } from "@/utils/router";
import "../styles.scss";

export default function RecoverPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const basePath = getBasePath(path);
  const history = useHistory();
  const dispatch = useDispatch();

  const accessToken = useSelector(selectAccessToken);
  const isLoading = useSelector(selectIsLoading);

  const { control, handleSubmit, formState, setError } =
    useForm<PasswordReset_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: PasswordReset_RequestBody) {
    if (accessToken) {
      dispatch(logout());
    }

    dispatch(
      recover({
        data,
        onError: (err) => {
          if (err.response && err.response.data.email) {
            setError("email", { message: err.response.data.email[0] });
          }
          if (err.response && err.response.data.message) {
            toast.error(err.response.data.message);
          }
        },
      })
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
            readonly={formState.isSubmitting || isLoading}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.recoverAccess")}
            isLoading={isLoading}
            disabled={isLoading}
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
          <p className="authorization--description">
            {t("policy.title")}{" "}
            <a className="authorization__link description" href={urls.privacy}>
              {t("policy.document")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
