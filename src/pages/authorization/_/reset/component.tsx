import Button from "components/button";
import Field from "components/formElements/field";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { ReactComponent as LineSvg } from "static/images/line.svg";
import { getBasePath } from "utils/router.utils";
import "../styles.scss";

export default function ResetPage() {
  const { path } = useRouteMatch();
  const { t } = useTranslation("p_authorization");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const basePath = getBasePath(path);
  const history = useHistory();

  const { control, handleSubmit, formState } = useForm({
    mode: "onSubmit",
  });

  return (
    <div id="page" className="page-container authorization">
      <div className="authorization--wrapper">
        <h1 className="authorization--heading">{t("reset.title")}</h1>
        <form
          className="authorization--form-submit"
          onSubmit={handleSubmit(() => console.log())}
        >
          <Field
            name="password"
            type="password"
            control={control}
            fullWidth
            label={t(`actions.password.title`)}
            placeholder={t(`actions.password.press`)}
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <Field
            name="passwordconfirm"
            type="passwordconfirm"
            control={control}
            fullWidth
            label={t(`actions.passwordconfirm.title`)}
            placeholder={t(`actions.passwordconfirm.press`)}
            readonly={formState.isSubmitted}
            rules={{
              required: tRules("required"),
            }}
          />
          <Button
            size="big"
            type="submit"
            fullWidth
            label={t("actions.resetPassword")}
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
