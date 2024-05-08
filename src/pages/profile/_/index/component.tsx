import { RegExp } from "constants/config";

import { useAddPortfolio } from "api/user/mutations/addPortfolio";
import { useEditFilePortfolio } from "api/user/mutations/editFilePortfolio";
import { useRemoveFilePortfolio } from "api/user/mutations/removeFilePortfolio";
import { useUserProfile } from "api/user/queries/userProfile";
import { PortfolioItem, PortfolioItem_RequestBody } from "api/user/types";
import cn from "classnames";
import Button from "components/button";
import Field from "components/formElements/field";
import PageLoader from "components/loaders/pageLoader";
import NavigationMenu from "pages/profile/components/navigationMenu";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import { ReactComponent as DownloadSvg } from "static/images/download-cloud.svg";
import { ReactComponent as EditSvg } from "static/images/edit.svg";
import { ReactComponent as ExampleAvatarSvg } from "static/images/example-avatar.svg";
import { ReactComponent as FileSvg } from "static/images/file.svg";
import { ReactComponent as FillStarSvg } from "static/images/fill-star.svg";
import { ReactComponent as HollowStarSvg } from "static/images/hollow-star.svg";
import { ReactComponent as TrashSvg } from "static/images/trash.svg";
import { Dispatch } from "store/types";
import { actions as userActions } from "store/user";
import { user as user_selector } from "store/user/user.selectors";
import {
  formatPhoneNumber,
  getFullDate,
  isMobileVersion,
} from "utils/constant.utils";
import { convertDataToFormData } from "utils/formdata.utils";
import { infoUser } from "utils/user.utils";

import MobileNavigationMenu from "../../components/mobileNavigationMenu";
import { baseUrl as baseProfileUrl } from "../../routes";
import "../../styles.scss";
import "./styles.scss";

export default function ProfileIndexPage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "index" });
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const [addingWork, setAddingWork] = useState(false);
  const [editingProfile, setEditingProfile] = useState<{
    isEdit: boolean;
    idFile: number | null;
  }>({ isEdit: false, idFile: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const params = useParams<{ profileId: string }>();

  const { user: myProfile } = useSelector(user_selector);
  const { data: user, isLoading } = useUserProfile(params.profileId);

  const isMyProfile = myProfile?.slug == user?.slug;

  const addPortfolio = useAddPortfolio();
  const editFilePortfolio = useEditFilePortfolio();
  const removeFilePortfolio = useRemoveFilePortfolio();

  const { control, handleSubmit, formState, setValue, reset, setError } =
    useForm<PortfolioItem_RequestBody>({
      mode: "onSubmit",
    });

  function renderAvatar() {
    switch (true) {
      case user && !!user.photo: {
        return <img src={user?.photo || ""} alt={user?.username} />;
      }
      default:
        return <ExampleAvatarSvg />;
    }
  }

  function triggerFileInput() {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function onChangeAdding() {
    setAddingWork(!addingWork);
    reset();
  }

  function onCancel() {
    setAddingWork(false);
    setEditingProfile({ isEdit: false, idFile: null });
    reset();
  }

  async function setValuePortfolio(item: PortfolioItem) {
    setAddingWork(true);
    setEditingProfile({ isEdit: true, idFile: item.id });
    setValue("title", item.title);
    setValue("description", item.description);
  }

  function onSubmitPortfolio(data: PortfolioItem_RequestBody) {
    const newData = { title: data.title, description: data.description };
    const formData = convertDataToFormData(newData);

    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      formData.append("file", fileInputRef.current.files[0]);
    }

    if (editingProfile.isEdit && editingProfile.idFile) {
      editFilePortfolio.mutate(
        {
          idFile: editingProfile.idFile,
          data: formData,
        },
        {
          onSuccess: (res) => {
            toast.success(t("portfolio.success"));
            onChangeAdding();
            onCancel();
            if (user) {
              dispatch(
                userActions.updateUser({
                  ...user,
                  portfolio_items: [
                    ...user.portfolio_items.filter(
                      (i) => i.id !== editingProfile.idFile
                    ),
                    res.data,
                  ],
                })
              );
            }
          },
        }
      );
    } else {
      addPortfolio.mutate(
        { data: formData },
        {
          onSuccess: (res) => {
            toast.success(t("portfolio.success"));
            onChangeAdding();
            if (user) {
              dispatch(
                userActions.updateUser({
                  ...user,
                  portfolio_items: [...user.portfolio_items, res.data],
                })
              );
            }
          },
          onError: (err) => {
            if (err.response) {
              if (err.response.data.title && err.response.data.title.length) {
                setError("title", { message: err.response.data.title[0] });
              }
              if (
                err.response.data.description &&
                err.response.data.description.length
              ) {
                setError("description", {
                  message: err.response.data.description[0],
                });
              }
              if (err.response.data.file && err.response.data.file.length) {
                setError("file", {
                  message: err.response.data.file[0],
                });
              }
            }
          },
        }
      );
    }
  }

  function handleRemoveFilePortfolio(idFile: number) {
    removeFilePortfolio.mutate(
      { idFile },
      {
        onSuccess: () => {
          if (editingProfile.idFile && editingProfile.idFile === idFile) {
            onCancel();
          }
          toast.success(t("portfolio.deleted"));
          if (user) {
            dispatch(
              userActions.updateUser({
                ...user,
                portfolio_items: user.portfolio_items.filter(
                  (i) => i.id !== idFile
                ),
              })
            );
          }
        },
        onError: (err) => {
          if (err.response && err.response.data.detail) {
            toast.error(err.response.data.detail);
          }
        },
      }
    );
  }

  function renderPortfolio() {
    if (
      (!isMyProfile && !user?.portfolio_items.length) ||
      (isMyProfile && !myProfile?.portfolio_items.length)
    ) {
      return <p className="profile-index--text">{t("exampleTasks.nothing")}</p>;
    }

    return (
      <div className="portfolio__wrapper">
        {(isMyProfile ? myProfile : user)?.portfolio_items.map((item) => (
          <div className="portfolio__item" key={item.id}>
            <div className="portfolio__header">
              <div className="portfolio__img">
                <FileSvg />
              </div>
              <div className="portfolio__item-info">
                <h3 className="portfolio__title">{item.title}</h3>
                <p className="portfolio__description" title={item.description}>
                  {item.description}
                </p>
                <div className="portfolio__item-other">
                  <label className="portfolio__item-signature content">
                    {t("portfolio.dateToLoad")}
                  </label>
                  <label className="portfolio__item-signature">
                    {getFullDate(item.uploaded_at)}
                  </label>
                </div>
              </div>
            </div>
            <div className="portfolio__actions">
              <a
                rel="noreferrer"
                className="portfolio__img"
                title={t("portfolio.download")}
                href={item.file}
                target="_blank"
              >
                <DownloadSvg />
              </a>
              <button
                hidden={!isMyProfile}
                className="portfolio__img"
                title={t("portfolio.edit")}
                onClick={() => setValuePortfolio(item)}
              >
                <EditSvg />
              </button>
              <button
                hidden={!isMyProfile}
                className="portfolio__img"
                title={t("portfolio.delete")}
                onClick={() => handleRemoveFilePortfolio(item.id)}
              >
                <TrashSvg />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderAddingWork() {
    if (!isMyProfile) {
      return;
    }

    if (!addingWork) {
      return (
        <Button
          label={t("addWork")}
          isLoading={formState.isSubmitting || removeFilePortfolio.isLoading}
          size="small"
          onClick={onChangeAdding}
        />
      );
    }

    return (
      <form
        onSubmit={handleSubmit(onSubmitPortfolio)}
        className="profile-index__portfolio"
      >
        <div className="profile-index__portfolio-filelds">
          <Field
            name="title"
            control={control}
            label={t("portfolio.title.title")}
            placeholder={t("portfolio.title.press")}
            readonly={
              formState.isSubmitting ||
              addPortfolio.isLoading ||
              editFilePortfolio.isLoading
            }
            rules={{
              required: tRules("required"),
              pattern: {
                value: RegExp.portfolio_title,
                message: tRules("pattern_portfolio_title"),
              },
            }}
          />
          <Field
            name="description"
            control={control}
            label={t("portfolio.description.title")}
            placeholder={t("portfolio.description.press")}
            readonly={
              formState.isSubmitting ||
              addPortfolio.isLoading ||
              editFilePortfolio.isLoading
            }
            rules={{
              required: tRules("required"),
              pattern: {
                value: RegExp.portfolio_description,
                message: tRules("pattern_portfolio_description"),
              },
            }}
          />
          <Field
            name="file"
            control={control}
            label={t("portfolio.file.title")}
            placeholder={t("portfolio.file.press")}
            readonly={
              formState.isSubmitting ||
              addPortfolio.isLoading ||
              editFilePortfolio.isLoading
            }
            type="file"
            innerRef={fileInputRef}
            onClick={triggerFileInput}
            rules={{
              required: tRules("required"),
            }}
          />
        </div>
        <div className="profile-index__portfolio-actions">
          <Button
            type="submit"
            label={t("save")}
            size="small"
            isLoading={
              formState.isSubmitting ||
              addPortfolio.isLoading ||
              editFilePortfolio.isLoading
            }
            disabled={
              formState.isSubmitting ||
              addPortfolio.isLoading ||
              editFilePortfolio.isLoading
            }
          />
          <Button
            isTransparent
            label={t("cancel")}
            size="small"
            onClick={onCancel}
            disabled={
              formState.isSubmitting ||
              addPortfolio.isLoading ||
              editFilePortfolio.isLoading
            }
          />
        </div>
      </form>
    );
  }

  if (location.pathname === "/profile/" || location.pathname === "/profile") {
    return <Redirect to={`/profile/user/${myProfile?.slug}`} />;
  }

  if (isLoading && myProfile?.slug !== params.profileId) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container profile-index">
      <div className="container-bar">
        <div
          className={cn("profile-tabs", {
            "item-hidden": !isMyProfile,
          })}
        >
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="profile-index--header">
            <div className="profile-index--user-avatar">{renderAvatar()}</div>
            <div className="profile-index--header-info">
              <div className="profile-index--user-info">
                <h2 className="profile-index--header-info--title">
                  {user && infoUser(user, true)}
                </h2>
                <p className="profile-index--subtitle">{user?.username}</p>
              </div>
              <div className="profile-index--user-email">{user?.email}</div>
              <div
                className={cn("profile-index--change-action", {
                  "item-hidden": !isMyProfile,
                })}
              >
                <Button
                  size="small"
                  label={t("actions.edit")}
                  color="blue-dark"
                  onClick={() => history.push(baseProfileUrl + "/edit")}
                />
              </div>
            </div>
          </header>
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">{t("rating")}</h2>
            <div className="profile-index__stars">
              {[...Array(Math.round(user?.stars || 0))].map((_, index) => (
                <div key={index} className="blue-star fill">
                  <FillStarSvg />
                </div>
              ))}
              {[...Array(5 - Math.round(user?.stars || 0))].map((_, index) => (
                <div key={index} className="blue-star">
                  <HollowStarSvg />
                </div>
              ))}
            </div>
          </section>
          {(user?.phone ||
            user?.place_study_work ||
            user?.birth_date ||
            (user?.skills && user.skills.length > 0)) && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("generalInfo")}</h2>
              {user?.birth_date && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("birth")}</h3>
                  <p className="profile-index--text">
                    {user.birth_date.toString()}
                  </p>
                </div>
              )}
              {user?.phone && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("phone")}</h3>
                  <p className="profile-index--text">
                    {formatPhoneNumber(user.phone)}
                  </p>
                </div>
              )}
              {user?.place_study_work && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("workPlace")}</h3>
                  <p className="profile-index--text">{user.place_study_work}</p>
                </div>
              )}
            </section>
          )}
          {user?.skills && user.skills.length > 0 && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("skills")}</h2>
              <ul className="profile-index--ul">
                {user.skills.map((skill, index) => (
                  <li className="profile-index--text" key={index}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {user?.description && user.description.length > 0 && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("about")}</h2>
              <p className="profile-index--text">{user.description}</p>
            </section>
          )}
          <section className="profile-index--section">
            <h2 className="profile-index--subtitle">
              {t("exampleTasks.title")}
            </h2>
            {renderPortfolio()}
            {renderAddingWork()}
          </section>
        </div>
        {isMyProfile && <NavigationMenu />}
      </div>
    </div>
  );
}
