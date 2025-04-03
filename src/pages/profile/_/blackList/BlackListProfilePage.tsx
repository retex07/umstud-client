import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useRemoveOfBlackList } from "@/api/user/mutations/removeUserBlackList";
import { useBlackList } from "@/api/user/queries/blackList";
import InlineUser from "@/components/inlineUser";
import PageLoader from "@/components/loaders/pageLoader";
import NoDataComponent from "@/components/noData";
import MobileNavigationMenu from "@/pages/profile/components/mobileNavigationMenu";
import { isMobileVersion } from "@/utils/util";

import NavigationMenu from "../../components/navigationMenu";
import "./BlackListProfilePage.scss";
import "../styles.scss";

export default function BlackListProfilePage() {
  const { t } = useTranslation("p_profile", { keyPrefix: "blackList" });

  const { data: blackList, isLoading, refetch } = useBlackList();
  const removeOfBlackList = useRemoveOfBlackList();

  function handleRemoveOfBlackList(idUser: number) {
    removeOfBlackList.mutate(
      { idUser },
      {
        onSuccess: () => {
          refetch().then(() => {
            toast.success(t("successRemove"));
          });
        },
        onError: (err) => {
          if (err.response?.data?.detail) {
            toast.error(err.response.data.detail);
          }
        },
      }
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div id="page" className="page-container">
      <div className="container-bar">
        <div className="profile-tabs">
          {isMobileVersion() && <MobileNavigationMenu />}
        </div>
        <div className="page-content-wrapper">
          <header className="page-content-title">{t("title")}</header>
          <section>
            {blackList && !blackList.length && <NoDataComponent />}
            {blackList?.map((user) => (
              <div className="black-list" key={user.id}>
                <div className="black-list__user-actions">
                  <InlineUser {...user.blocked_user} />
                  <button
                    className="black-list__user-remove"
                    onClick={() =>
                      handleRemoveOfBlackList(user.blocked_user.id)
                    }
                  >
                    {t("removeUser")}
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
        <NavigationMenu />
      </div>
    </div>
  );
}
