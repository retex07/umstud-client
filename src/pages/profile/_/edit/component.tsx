import { RegExp } from "constants/config";

import useEditProfile from "api/user/mutations/editProfile";
import { useMeProfile } from "api/user/queries/meProfile";
import { useSkills } from "api/user/queries/skills";
import { DetailUserProfile, Skill, UserPut_FormBody } from "api/user/types";
import Button from "components/button";
import Field from "components/formElements/field";
import SelectField from "components/formElements/selectField";
import TextareaField from "components/formElements/textareaField";
import PageLoader from "components/loaders/pageLoader";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import { SelectOption } from "types/components";
import { splitKey } from "utils/constant.utils";

import "./styles.scss";

export default function ProfileEdit() {
  const { t } = useTranslation("p_profile", { keyPrefix: "edit" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const { data: dataSkills, isLoading: isLoadingSkills } = useSkills();

  const { user } = useSelector(user_selector);
  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.photo || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refetch: refetchUserProfile } = useMeProfile<DetailUserProfile>();

  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();
  const editProfile = useEditProfile();

  type KeysOfEditProfile_RequestBody = keyof UserPut_FormBody;
  const keysEditProfileRequest: KeysOfEditProfile_RequestBody[] = [
    "last_name",
    "first_name",
    "patronymic",
    "email",
    "place_study_work",
    "phone",
    "birth_date",
  ];

  const userSkillsOptions = user?.skills.map((skill) => {
    return { value: skill.id, label: skill.name };
  });

  const { control, handleSubmit, formState } = useForm<UserPut_FormBody>({
    mode: "onSubmit",
    defaultValues: {
      last_name: user?.last_name,
      first_name: user?.first_name,
      patronymic: user?.patronymic,
      email: user?.email,
      place_study_work: user?.place_study_work,
      phone: user?.phone,
      birth_date: user?.birth_date,
      description: user?.description,
      skills: userSkillsOptions,
    },
  });

  function onValidSubmit(data: UserPut_FormBody) {
    setIsLoadingEditProfile(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        if (Array.isArray(value) && key === "skills") {
          value.forEach((skill) =>
            formData.append(`${key}`, skill.value.toString())
          );
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}`, item.toString()));
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      formData.append("photo", fileInputRef.current.files[0]);
    }
    editProfile.mutate(
      { data: formData },
      {
        onSuccess: () => {
          setIsLoadingEditProfile(false);
          history.push("/profile");
          refetchUserProfile().then((res) =>
            dispatch(userActions.updateUser(res.data || null))
          );
        },
        onError: () => {
          setIsLoadingEditProfile(false);
          // Empty
        },
      }
    );
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }

  function parseValueToSelect(value: Skill[]) {
    const options: SelectOption[] = [];
    value.forEach((option) => {
      options.push({
        value: option.id,
        label: option.name,
      });
    });
    return options;
  }

  function triggerFileInput() {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function getRegExpOfKey(key: string) {
    switch (key) {
      case "last_name": {
        return RegExp.last_name;
      }
      case "first_name": {
        return RegExp.first_name;
      }
      case "patronymic": {
        return RegExp.patronymic;
      }
      case "email": {
        return RegExp.email;
      }
      case "place_study_work": {
        return RegExp.place_study_work;
      }
      case "phone": {
        return RegExp.phone;
      }
      case "birth_date": {
        return RegExp.birth_date;
      }
      default: {
        return RegExp.last_name;
      }
    }
  }

  function renderAvatar() {
    return imagePreview ? (
      <img src={imagePreview} alt={user?.username || "Avatar"} />
    ) : (
      <ExampleAvatarSvg />
    );
  }

  if (isLoadingSkills) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container profile-edit">
      <div className="profile-edit__wrapper">
        <header className="profile-edit__header">
          <h1 className="profile-edit__header-title">{t("title")}</h1>
          <label
            className="profile-edit__header-subtitle"
            onClick={() => history.goBack()}
          >
            {t("cancel")}
          </label>
        </header>
        <div className="profile-edit__photo">
          {renderAvatar()}
          <div>
            <Button
              label={t("loadPhoto")}
              size="middle"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="profile-edit__loadfile"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form
          className="profile-edit__inputs"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <div className="profile-edit__inputs-info">
            {keysEditProfileRequest.map((key) => (
              <Field
                classNames="profile-edit__input"
                key={key}
                name={key}
                control={control}
                label={t(`actions.${splitKey(key)}.title`)}
                placeholder={t(`actions.${splitKey(key)}.press`)}
                readonly={formState.isSubmitted}
                rules={{
                  required: tRules("required"),
                  pattern: {
                    value: getRegExpOfKey(key),
                    message: tRules(`pattern_${splitKey(key)}`),
                  },
                }}
              />
            ))}
            <SelectField
              classNames="profile-edit__select"
              name="skills"
              control={control}
              options={parseValueToSelect(dataSkills || [])}
              label={t(`actions.skills.title`)}
              placeholder={t(`actions.skills.press`)}
              rules={{
                required: tRules("required"),
              }}
              isMulti
            />
            <TextareaField
              classNames="profile-edit__description"
              name="description"
              control={control}
              label={t("actions.description.title")}
              placeholder={t("actions.description.press")}
              readonly={formState.isSubmitted}
              fullWidth
            />
          </div>
          <Button
            size="big"
            label={t("save")}
            type="submit"
            isLoading={isLoadingEditProfile}
            disabled={isLoadingEditProfile}
          />
        </form>
      </div>
    </div>
  );
}
