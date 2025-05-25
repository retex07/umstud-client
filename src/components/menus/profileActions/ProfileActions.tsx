import isFunction from "lodash/isFunction";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useAddToBlackList } from "@/api/user/mutations/addToBlackList";
import { useRemoveOfBlackList } from "@/api/user/mutations/removeUserBlackList";
import { useBlackList } from "@/api/user/queries/blackList";
import Dropdown from "@/components/Dropdown";
import { selectAccessToken } from "@/store/selectors/auth";
import { selectUserData } from "@/store/selectors/user";
import { copyTextToClipboard } from "@/utils/util";
import "./ProfileActions.scss";

interface Props {
  isMyProfile: boolean;
  userId: number;
}

interface ItemAction {
  [key: string]: string | number | CSSProperties | (() => void);
  title: string;
  action: () => void;
}

export default function ProfileActions(props: Props) {
  const { t } = useTranslation("c_menus", { keyPrefix: "profileActions" });
  const [itemsAction, setItemsAction] = useState<ItemAction[]>([
    {
      title: t("copyLinkToClipboard"),
      action: copyLinkToClipboard,
    },
  ]);
  const menuRef = useRef<HTMLDivElement>(null);

  const myProfile = useSelector(selectUserData);
  const accessToken = useSelector(selectAccessToken);

  const { data: blackList, isLoading } = useBlackList({
    enabled: !!myProfile && !!accessToken,
  });

  const addUserToBlackList = useAddToBlackList();
  const removeOfBlackList = useRemoveOfBlackList();

  useEffect(() => {
    if (myProfile && accessToken) {
      if (blackList?.some((user) => user.blocked_user.id === props.userId)) {
        setItemsAction([
          {
            title: t("copyLinkToClipboard"),
            action: copyLinkToClipboard,
          },
          {
            title: t("removeOfBlackList"),
            action: handleRemoveOfBlackList,
          },
        ]);
      } else if (!props.isMyProfile) {
        setItemsAction([
          {
            title: t("copyLinkToClipboard"),
            action: copyLinkToClipboard,
          },
          {
            title: t("addToBlackList"),
            action: handleAddToBlackList,
          },
        ]);
      }
    }
  }, [blackList]);

  function handleRemoveOfBlackList() {
    removeOfBlackList.mutate(
      { idUser: props.userId },
      {
        onSuccess: () => {
          toast.success(t("blackList.removeSuccess"));
        },
        onError: (err) => {
          if (err.response?.data?.detail) {
            toast.error(err.response.data.detail);
          }
        },
      }
    );
  }

  function handleAddToBlackList() {
    addUserToBlackList.mutate(
      { data: { blocked_user: props.userId } },
      {
        onSuccess: () => {
          toast.success(t("blackList.addSuccess"));
        },
        onError: (err) => {
          if (err.response?.data?.blocked_user?.length) {
            toast.error(err.response.data.blocked_user[0]);
          }
        },
      }
    );
  }

  function copyLinkToClipboard() {
    copyTextToClipboard(window.location.href).then(() => {
      toast.success(t("copyLinkSuccess"));
    });
  }

  if (isLoading) {
    return null;
  }

  return (
    <div ref={menuRef} className="profile-actions">
      <Dropdown
        sources={itemsAction}
        fieldLabel="title"
        label={t("actions") || ""}
        onChange={(i) => isFunction(i.action) && i.action()}
      />
    </div>
  );
}
