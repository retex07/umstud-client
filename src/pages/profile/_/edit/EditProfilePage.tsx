import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useSkills } from "@/api/user/queries/skills";
import { Skill, UserPut_FormBody } from "@/api/user/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import SelectField from "@/components/formElements/selectField";
import TextareaField from "@/components/formElements/textareaField";
import ImgEditor from "@/components/imgEditor";
import PageLoader from "@/components/loaders/pageLoader";
import { RegExp } from "@/constants/config";
import { ReactComponent as ExampleAvatarSvg } from "@/static/images/example-avatar.svg";
import { changeMyProfile } from "@/store/actions/user";
import { selectUser } from "@/store/selectors/user";
import { Dispatch } from "@/store/types";
import { SelectOption } from "@/types/components";
import { convertDataToFormData } from "@/utils/formdata";
import { convertDate, splitKey } from "@/utils/util";
import "./EditProfilePage.scss";
import "../styles.scss";

export default function EditProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "edit" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const dateInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();

  const { data: dataSkills, isLoading: isLoadingSkills } = useSkills();
  const { user, isLoading } = useSelector(selectUser);

  const [imagePreview, setImagePreview] = useState(user?.photo || "");
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const gifInputRef = useRef<HTMLInputElement>(null);

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
      birth_date: convertDate(user?.birth_date, true, "."),
      description: user?.description,
      skills: userSkillsOptions,
    },
  });

  function onValidSubmit(data: UserPut_FormBody) {
    const newData = {
      ...data,
      birth_date: convertDate(data.birth_date),
    };

    const formData = convertDataToFormData(newData);

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    dispatch(changeMyProfile(formData));
  }

  function blockPrevDate() {
    if (dateInputRef.current) {
      dateInputRef.current.max = new Date().toISOString().split("T")[0];
      dateInputRef.current.min = new Date(
        new Date().getFullYear() - 120,
        1,
        -29
      )
        .toISOString()
        .split("T")[0];
    }
  }

  function handleGifChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
      if (file) {
        setImagePreview(URL.createObjectURL(file));
        toast(t("infoSavePhoto"));
      }
    }
  }

  function handleImageChange(file: File) {
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
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

  function triggerGifInput() {
    if (gifInputRef && gifInputRef.current) {
      gifInputRef.current.click();
    }
  }

  function triggerImgInput() {
    setIsEditAvatar(true);
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

  function checkRequired(key: string) {
    switch (key) {
      case "patronymic":
      case "place_study_work":
      case "description":
      case "phone": {
        return false;
      }
      default: {
        return true;
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
      <ImgEditor
        innerRef={imgInputRef}
        handleChange={handleImageChange}
        isOpen={!isLoading && isEditAvatar}
        onClose={() => setIsEditAvatar(false)}
      />
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
          <div className="profile-edit__photo-actions">
            <Button
              label={t("loadPhoto")}
              size="middle"
              onClick={triggerImgInput}
            />
            {(user?.is_staff || user?.is_superuser) && (
              <Button
                label={t("loadGif")}
                size="middle"
                onClick={triggerGifInput}
              />
            )}
          </div>
          <input
            readOnly={formState.isSubmitting || isLoading}
            type="file"
            accept="image/gif"
            ref={gifInputRef}
            className="profile-edit__loadfile"
            onChange={handleGifChange}
          />
        </div>
        <form
          className="profile-edit__inputs"
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <div className="profile-edit__inputs-info">
            {keysEditProfileRequest.map((key) => (
              <Field
                classNames="profile-edit__input"
                innerRef={
                  key === "birth_date" ? dateInputRef : React.createRef()
                }
                key={key}
                name={key}
                control={control}
                onClick={() => key === "birth_date" && blockPrevDate()}
                type={key === "birth_date" ? "date" : "text"}
                label={t(`actions.${splitKey(key)}.title`)}
                placeholder={t(`actions.${splitKey(key)}.press`)}
                readonly={
                  formState.isSubmitting || isLoading || key === "email"
                }
                rules={{
                  required: checkRequired(key) ? tRules("required") : false,
                  pattern: {
                    value: getRegExpOfKey(key),
                    message: tRules(`pattern_${splitKey(key)}`),
                  },
                }}
              />
            ))}
            <SelectField
              closeMenuOnSelect={false}
              classNames="profile-edit__select"
              name="skills"
              control={control}
              options={parseValueToSelect(dataSkills || [])}
              label={t(`actions.skills.title`)}
              placeholder={t(`actions.skills.press`)}
              readOnly={formState.isSubmitting || isLoading}
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
              readonly={formState.isSubmitting || isLoading}
              fullWidth
            />
          </div>
          <div className="profile-edit__actions">
            <Button
              size="big"
              label={t("save")}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Button
              size="big"
              label={t("toCancel")}
              isTransparent
              disabled={isLoading}
              onClick={() => history.goBack()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
