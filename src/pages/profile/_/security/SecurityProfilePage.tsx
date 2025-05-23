import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import {
  ChangePassword_ErrorBody,
  ChangePassword_RequestBody,
} from "@/api/handlers/user/types";
import { useChangePass } from "@/api/user/mutations/changePassword";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import { isMobileVersion } from "@/utils/util";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import NavigationMenu from "../../components/navigationMenu";
import "./SecurityProfilePage.scss";
import "../styles.scss";

export default function SecurityProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "security" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const changePassword = useChangePass();

  const [changingPass, setChangingPass] = useState(false);

  const { control, handleSubmit, setError, reset, formState } =
    useForm<ChangePassword_RequestBody>({
      mode: "onSubmit",
    });

  function onChangePassSubmit(data: ChangePassword_RequestBody) {
    changePassword.mutate(
      { data: data },
      {
        onSuccess: () => {
          toast.success(t("changePass.notification"), { duration: 5000 });
          setChangingPass(false);
          reset();
        },
        onError: (err) => {
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

  function onCancelChangePass() {
    setChangingPass(false);
    reset();
  }

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
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
                      readonly={
                        formState.isSubmitting || changePassword.isLoading
                      }
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
                      readonly={
                        formState.isSubmitting || changePassword.isLoading
                      }
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
                      readonly={
                        formState.isSubmitting || changePassword.isLoading
                      }
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
                        isLoading={changePassword.isLoading}
                        disabled={changePassword.isLoading}
                      />
                      <Button
                        isTransparent
                        label={t("cancel")}
                        onClick={onCancelChangePass}
                        disabled={changePassword.isLoading}
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
            </div>
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
