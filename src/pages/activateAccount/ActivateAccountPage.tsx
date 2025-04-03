import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@/components/button";
import PageLoader from "@/components/loaders/pageLoader";
import urls from "@/services/router/urls";
import { ReactComponent as CheckSvg } from "@/static/images/checkConfirm.svg";
import { ReactComponent as ErrorSvg } from "@/static/images/errorCircle.svg";
import { activateUserAccount } from "@/store/actions/user";
import { selectActivationAccount } from "@/store/selectors/user";
import { Dispatch } from "@/store/types";
import { useQuery } from "@/utils/router";
import "./ActivateAccountPage.scss";

export default function ActivateAccountPage() {
  const { t } = useTranslation("p_activateAccount");

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch<Dispatch>();

  const { isInitialized, isLoading, isError } = useSelector(
    selectActivationAccount
  );

  const uidb64 = query.get("uidb64") || "";
  const token = query.get("token") || "";

  useEffect(() => {
    dispatch(activateUserAccount({ uidb64, token }));
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleClickSignIn = () => {
    history.push(urls.auth.index + urls.auth.signIn);
  };

  function renderSuccess() {
    return (
      <div className="page-activate-account">
        <header className="page-activate-account__header">
          <CheckSvg />
          <h1 className="page-activate-account__heading">{t("success")}</h1>
        </header>
        <p>{t("description")}</p>
        <div className="page-activate-account__action">
          <Button
            fullWidth
            size="small"
            label={t("login")}
            onClick={handleClickSignIn}
          />
        </div>
      </div>
    );
  }

  function renderError() {
    return (
      <div className="page-activate-account">
        <header className="page-activate-account__header">
          <ErrorSvg />
          <h1 className="page-activate-account__heading">{t("error")}</h1>
        </header>
        <p>{t("errorMsg")}</p>
        <p>{t("sendAdmin")}</p>
      </div>
    );
  }

  return !!isInitialized && !isError ? renderSuccess() : renderError();
}
