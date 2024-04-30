import { useChangePass } from "api/user/mutations/changePassword";
import {
  ChangePassword_ErrorBody,
  ChangePassword_RequestBody,
} from "api/user/types";
import Button from "components/button";
import Field from "components/formElements/field";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { user as user_selector } from "store/user/user.selectors";
import { isMobileVersion } from "utils/constant.utils";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import NavigationMenu from "../../components/navigationMenu";
import "./styles.scss";

export default function ProfileSecurityPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "security" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const { user: userProfile } = useSelector(user_selector);

  const [changingPass, setChangingPass] = useState(false);
  const [isLoadingChangePass, setIsLoadingChangePass] = useState(false);

  const changePassword = useChangePass();

  const { control, handleSubmit, setError, reset } = useForm<
    ChangePassword_RequestBody | { email: string }
  >({
    mode: "onSubmit",
  });

  function onChangePassSubmit(data: ChangePassword_RequestBody) {
    setIsLoadingChangePass(true);

    changePassword.mutate(
      { data: data },
      {
        onSuccess: () => {
          setIsLoadingChangePass(false);
          setChangingPass(false);
          reset();
        },
        onError: (err) => {
          setIsLoadingChangePass(false);
          const errData = err.response?.data;
          if (!errData) return;

          const setFieldError = (
            fieldName: keyof ChangePassword_RequestBody,
            messageKey: keyof ChangePassword_ErrorBody
          ) => {
            const messageArray = errData[messageKey];
            if (messageArray?.length) {
              setError(fieldName, { message: messageArray[0] });
            }
          };

          setFieldError("old_password", "old_password");
          setFieldError("new_password", "new_password");

          if (errData.new_password_confirm?.length) {
            const message = errData.new_password_confirm[0];
            setError("new_password", { message });
            setError("new_password_confirm", { message });
          }

          if (errData.non_field_errors?.length) {
            const message = errData.non_field_errors[0];
            setError("new_password", { message });
            setError("new_password_confirm", { message });
          }
        },
      }
    );
  }

  function onChangeEmailSubmit() {
    // empty
  }

  function onCancelChangePass() {
    setChangingPass(false);
    reset();
  }

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        {isMobileVersion() && <MobileNavigationMenu />}
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          <div className="profile-security">
            <div className="profile-security__main-sec">
              <form
                className="profile-security__item"
                onSubmit={handleSubmit(onChangePassSubmit)}
              >
                <h3 className="profile-security__item-title">
                  {t("changePass.title")}
                </h3>
                {changingPass ? (
                  <>
                    <Field
                      name="old_password"
                      control={control}
                      label={t("changePass.oldpassword.title")}
                      placeholder={t("changePass.oldpassword.press")}
                      readonly={isLoadingChangePass}
                      type="password"
                      rules={{
                        required: tRules("required"),
                      }}
                      fullWidth
                    />
                    <Field
                      name="new_password"
                      control={control}
                      label={t("changePass.newpassword.title")}
                      placeholder={t("changePass.newpassword.press")}
                      readonly={isLoadingChangePass}
                      type="password"
                      rules={{
                        required: tRules("required"),
                      }}
                      fullWidth
                    />
                    <Field
                      name="new_password_confirm"
                      control={control}
                      label={t("changePass.newpasswordconfirm.title")}
                      placeholder={t("changePass.newpasswordconfirm.press")}
                      readonly={isLoadingChangePass}
                      type="password"
                      rules={{
                        required: tRules("required"),
                      }}
                      fullWidth
                    />
                    <div className="profile-security__actions">
                      <Button
                        color="blue-dark"
                        label={t("save")}
                        type="submit"
                        isLoading={isLoadingChangePass}
                        disabled={isLoadingChangePass}
                      />
                      <Button
                        isTransparent
                        label={t("cancel")}
                        onClick={onCancelChangePass}
                        disabled={isLoadingChangePass}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Field
                      fullWidth
                      name="old_password"
                      control={control}
                      label={t("changePass.oldpassword.title")}
                      placeholder="************"
                      readonly
                    />
                    <Button
                      color="blue-dark"
                      label={t("next")}
                      onClick={() => setChangingPass(!changingPass)}
                    />
                  </>
                )}
              </form>
              <form
                className="profile-security__item"
                onSubmit={handleSubmit(onChangeEmailSubmit)}
              >
                <h3 className="profile-security__item-title">
                  {t("changeEmail.title")}
                </h3>
                <Field
                  fullWidth
                  name="email"
                  control={control}
                  label={t("changeEmail.email.title")}
                  type="email"
                  placeholder={userProfile?.email}
                  readonly
                />
                <Button color="blue-dark" label={t("next")} />
              </form>
            </div>
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
