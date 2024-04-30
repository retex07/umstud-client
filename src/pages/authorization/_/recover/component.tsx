import { useRecover } from "api/recover/mutations/recover";
import { PasswordReset_RequestBody } from "api/recover/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { getBasePath } from "utils/router.utils";
import "../styles.scss";

export default function RecoverPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const [isLoadingRecover, setIsLoadingRecover] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const recover = useRecover();
  const basePath = getBasePath(path);
  const history = useHistory();

  const { control, handleSubmit, formState, setError } =
    useForm<PasswordReset_RequestBody>({
      mode: "onSubmit",
    });

  function onValidSubmit(data: PasswordReset_RequestBody) {
    setIsLoadingRecover(true);

    recover.mutate(
      { data: data },
      {
        onSuccess: (res) => {
          setStateMessage(res.data.message);
          setIsLoadingRecover(false);
        },
        onError: (err) => {
          setIsLoadingRecover(false);
          setError("email", { message: err.message });
          setStateMessage(null);
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
            readonly={formState.isSubmitting || isLoadingRecover}
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
            label={t("actions.recoverAccess")}
            isLoading={isLoadingRecover}
            disabled={isLoadingRecover}
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
