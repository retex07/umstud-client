import { useReset } from "api/reset/mutations/reset";
import { PasswordResetConfirm_RequestBody } from "api/reset/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { getBasePath, useQuery } from "utils/router.utils";

import "../styles.scss";

export default function ResetPage() {
  const { path } = useRouteMatch();
  const basePath = getBasePath(path);
  const query = useQuery();
  const history = useHistory();
  const uidb64 = query.get("uidb64");
  const token = query.get("token");

  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const reset = useReset(uidb64 || "", token || "");

  const { control, handleSubmit, formState, setError } =
    useForm<PasswordResetConfirm_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: PasswordResetConfirm_RequestBody) {
    setIsLoadingReset(true);

    reset.mutate(
      { data: data },
      {
        onSuccess: (res) => {
          setStateMessage(res.data.message);
          setIsLoadingReset(false);
        },
        onError: (err) => {
          setIsLoadingReset(false);
          setStateMessage(null);
          setError("new_password", { message: err.message });
          setError("confirm_password", { message: err.message });
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
            readonly={formState.isSubmitting || isLoadingReset}
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
            readonly={formState.isSubmitting || isLoadingReset}
            rules={{
              required: tRules("required"),
            }}
          />
          {stateMessage && (
            <p className="authorization__response-msg">{stateMessage}</p>
          )}
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.resetPassword")}
            isLoading={isLoadingReset}
            disabled={isLoadingReset}
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
