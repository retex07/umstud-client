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
import Modal from "components/modal";
import { useConfirm } from "contexts/confirm/hooks";
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

  const [openViewFileId, setOpenViewFileId] = useState<number | null>(null);
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

  const { requestConfirm } = useConfirm();
  const { user: myProfile } = useSelector(user_selector);
  const { data: user, isLoading } = useUserProfile(params.profileId, {
    enabled: !!params.profileId,
  });

  const isMyProfile = myProfile?.slug === params.profileId;

  const addPortfolio = useAddPortfolio();
  const editFilePortfolio = useEditFilePortfolio();
  const removeFilePortfolio = useRemoveFilePortfolio();

  const { control, handleSubmit, formState, setValue, reset, setError } =
    useForm<PortfolioItem_RequestBody>({
      mode: "onSubmit",
    });

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

  async function handleRemoveFilePortfolio(item: PortfolioItem) {
    const confirm = await requestConfirm(
      t("portfolio.confirm", { title: item.title }),
      true
    );

    if (confirm) {
      removeFilePortfolio.mutate(
        { idFile: item.id },
        {
          onSuccess: () => {
            if (editingProfile.idFile && editingProfile.idFile === item.id) {
              onCancel();
            }
            toast.success(t("portfolio.deleted"));
            if (user) {
              dispatch(
                userActions.updateUser({
                  ...user,
                  portfolio_items: user.portfolio_items.filter(
                    (i) => i.id !== item.id
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
  }

  function renderPortfolio() {
    if (
      (!isMyProfile && !user?.portfolio_items.length) ||
      (isMyProfile && !myProfile?.portfolio_items.length)
    ) {
      return (
        <>
          <p className="profile-index--text">{t("exampleTasks.nothing")}</p>
          {isMyProfile && (
            <Button
              label={t("addWork")}
              isLoading={
                formState.isSubmitting || removeFilePortfolio.isLoading
              }
              size="small"
              onClick={onChangeAdding}
            />
          )}
        </>
      );
    }

    return (
      <div className="portfolio__wrapper">
        {(isMyProfile ? myProfile : user)?.portfolio_items.map((item) => (
          <article className="portfolio__item" key={item.id}>
            <Modal
              isOpen={openViewFileId === item.id}
              onClose={() => setOpenViewFileId(null)}
              title={t("portfolio.viewing", { title: item.title })}
            >
              <div className="portfolio__view">
                <div className="portfolio__view-info">
                  <h3 className="portfolio__view-title">
                    {t("portfolio.title.title")}
                  </h3>
                  <p>{item.title}</p>
                </div>
                <div className="portfolio__view-info">
                  <h3 className="portfolio__view-title">
                    {t("portfolio.description.title")}
                  </h3>
                  <p>{item.description}</p>
                </div>
                <div className="portfolio__view-info">
                  <h3 className="portfolio__view-title">
                    {t("portfolio.dateToLoad")}
                  </h3>
                  <p>{getFullDate(item.uploaded_at)}</p>
                </div>
              </div>
              <Button
                label={t("cancel")}
                onClick={() => setOpenViewFileId(null)}
                isTransparent
                fullWidth
              />
            </Modal>
            <header className="portfolio__header">
              <div
                onClick={() => setOpenViewFileId(item.id)}
                className="portfolio__item-info"
              >
                <div className="portfolio__img">
                  <FileSvg />
                </div>
                <div className="portfolio__item-descr">
                  <h3 className="portfolio__title" title={item.title}>
                    {item.title}
                  </h3>
                  <p
                    className="portfolio__description"
                    title={item.description}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="portfolio__actions">
                <a
                  rel="noreferrer"
                  className="portfolio__img action"
                  title={t("portfolio.download")}
                  href={item.file}
                  target="_blank"
                >
                  <DownloadSvg />
                </a>
                <button
                  hidden={!isMyProfile}
                  className="portfolio__img action"
                  title={t("portfolio.edit")}
                  onClick={() => setValuePortfolio(item)}
                >
                  <EditSvg />
                </button>
                <button
                  hidden={!isMyProfile}
                  className="portfolio__img action"
                  title={t("portfolio.delete")}
                  onClick={() => handleRemoveFilePortfolio(item)}
                >
                  <TrashSvg />
                </button>
              </div>
            </header>
            <footer className="portfolio__footer">
              <div className="portfolio__item-other">
                <label className="portfolio__item-signature content">
                  {t("portfolio.dateToLoad")}
                </label>
                <label className="portfolio__item-signature">
                  {getFullDate(item.uploaded_at)}
                </label>
              </div>
            </footer>
          </article>
        ))}
        {isMyProfile && (
          <Button
            label={t("addWork")}
            isLoading={formState.isSubmitting || removeFilePortfolio.isLoading}
            size="small"
            onClick={onChangeAdding}
          />
        )}
      </div>
    );
  }

  function renderAddingWork() {
    if (!isMyProfile) {
      return;
    }

    return (
      <Modal
        title={t("portfolio.adding")}
        isOpen={addingWork}
        onClose={onChangeAdding}
      >
        <form
          onSubmit={handleSubmit(onSubmitPortfolio)}
          className="profile-index__portfolio"
        >
          <div className="profile-index__portfolio-filelds">
            <Field
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
              isTransparent
              label={t("cancel")}
              onClick={onCancel}
              disabled={
                formState.isSubmitting ||
                addPortfolio.isLoading ||
                editFilePortfolio.isLoading
              }
            />
          </div>
        </form>
      </Modal>
    );
  }

  if (location.pathname === "/profile/" || location.pathname === "/profile") {
    return <Redirect to={`/profile/user/${myProfile?.slug}`} />;
  }

  if (isLoading && myProfile?.slug !== params.profileId) {
    return <PageLoader />;
  }

  function getUser() {
    switch (true) {
      case myProfile?.slug === params.profileId:
        return myProfile;
      case myProfile?.slug !== params.profileId:
        return user;
      default:
        return null;
    }
  }

  const profileUser = getUser();

  function renderAvatar() {
    switch (true) {
      case profileUser && !!profileUser.photo: {
        return (
          <img src={profileUser?.photo || ""} alt={profileUser?.username} />
        );
      }
      default:
        return <ExampleAvatarSvg />;
    }
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
                  {profileUser && infoUser(profileUser, true)}
                </h2>
                <p className="profile-index--subtitle">
                  {profileUser?.username}
                </p>
              </div>
              <div className="profile-index--user-email">
                {profileUser?.email}
              </div>
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
              {[...Array(Math.round(profileUser?.stars || 0))].map(
                (_, index) => (
                  <div key={index} className="blue-star fill">
                    <FillStarSvg />
                  </div>
                )
              )}
              {[...Array(5 - Math.round(profileUser?.stars || 0))].map(
                (_, index) => (
                  <div key={index} className="blue-star">
                    <HollowStarSvg />
                  </div>
                )
              )}
            </div>
          </section>
          {(profileUser?.phone ||
            profileUser?.place_study_work ||
            profileUser?.birth_date ||
            (profileUser?.skills && profileUser.skills.length > 0)) && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("generalInfo")}</h2>
              {profileUser?.birth_date && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("birth")}</h3>
                  <p className="profile-index--text">
                    {profileUser.birth_date.toString()}
                  </p>
                </div>
              )}
              {profileUser?.phone && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("phone")}</h3>
                  <p className="profile-index--text">
                    {formatPhoneNumber(profileUser.phone)}
                  </p>
                </div>
              )}
              {profileUser?.place_study_work && (
                <div className="profile-index--header-info--item">
                  <h3 className="profile-index--text">{t("workPlace")}</h3>
                  <p className="profile-index--text">
                    {profileUser.place_study_work}
                  </p>
                </div>
              )}
            </section>
          )}
          {profileUser?.skills && profileUser.skills.length > 0 && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("skills")}</h2>
              <ul className="profile-index--ul">
                {profileUser.skills.map((skill, index) => (
                  <li className="profile-index--text" key={index}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {profileUser?.description && profileUser.description.length > 0 && (
            <section className="profile-index--section">
              <h2 className="profile-index--subtitle">{t("about")}</h2>
              <p className="profile-index--text">{profileUser.description}</p>
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
