import cn from "classnames";
import isFunction from "lodash/isFunction";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useAddToBlackList } from "@/api/user/mutations/addToBlackList";
import { useRemoveOfBlackList } from "@/api/user/mutations/removeUserBlackList";
import { useBlackList } from "@/api/user/queries/blackList";
import Button from "@/components/button";
import MenuBuilder from "@/components/menus/builder";
import { ReactComponent as DropDownSvg } from "@/static/images/chevron-down.svg";
import { selectAccessToken } from "@/store/selectors/auth";
import { selectUserData } from "@/store/selectors/user";
import { menuListener } from "@/utils/listener";
import { copyTextToClipboard } from "@/utils/util";
import "./ProfileActions.scss";

interface Props {
  isMyProfile: boolean;
  userId: number;
}

export default function ProfileActions(props: Props) {
  const { t } = useTranslation("c_menus", { keyPrefix: "profileActions" });
  const [isOpen, setIsOpen] = useState(false);
  const [itemsAction, setItemsAction] = useState([
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

  useEffect(() => {
    menuListener(menuRef, isOpen, () => setIsOpen(false));
  }, [isOpen]);

  function handleRemoveOfBlackList() {
    removeOfBlackList.mutate(
      { idUser: props.userId },
      {
        onSuccess: () => {
          toast.success(t("blackList.removeSuccess"));
          setIsOpen(false);
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
          setIsOpen(false);
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
      setIsOpen(false);
    });
  }

  function changeIsOpen() {
    setIsOpen(!isOpen);
  }

  if (isLoading) {
    return null;
  }

  return (
    <div ref={menuRef} className="profile-actions">
      <Button
        classNames={cn("profile-actions__btn", {
          active: isOpen,
        })}
        isTransparent
        size={props.isMyProfile ? "small" : "very-small"}
        onClick={changeIsOpen}
      >
        <span>{t("actions")}</span>
        <DropDownSvg />
      </Button>
      {isOpen && (
        <MenuBuilder
          items={itemsAction}
          classNames="profile-actions__menu"
          itemClassNames="profile-actions__action"
          handleClickItem={(i) => isFunction(i.action) && i.action()}
        />
      )}
    </div>
  );
}
