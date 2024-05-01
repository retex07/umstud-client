import { useActivateAccount } from "api/user/queries/activateAccount";
import Button from "components/button";
import PageLoader from "components/loaders/pageLoader";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as CheckSvg } from "static/images/checkConfirm.svg";
import { ReactComponent as ErrorSvg } from "static/images/errorCircle.svg";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { useQuery } from "utils/router.utils";
import "./styles.scss";

export default function ActivateAccountPage() {
  const { t } = useTranslation("p_activateAccount");

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch<Dispatch>();

  const uidb64 = query.get("uidb64") || "";
  const token = query.get("token") || "";

  const { accessToken } = useSelector(user_selector);
  const { data, isLoading, isError } = useActivateAccount(uidb64, token);

  useEffect(() => {
    if (accessToken) {
      dispatch(userActions.logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

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
            onClick={() => history.push("/auth/sign-in")}
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

  return <>{data && !isError ? renderSuccess() : renderError()}</>;
}
