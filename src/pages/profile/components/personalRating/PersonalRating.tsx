import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { DetailUserRating } from "@/api/handlers/user/types";
import AvatarUser from "@/components/avatarUser";
import { MIN_COMPLETED_ADS_RATING } from "@/constants/config";
import urls from "@/services/router/urls";
import { ReactComponent as FillStarSvg } from "@/static/images/fill-star.svg";
import { ReactComponent as HollowStarSvg } from "@/static/images/hollow-star.svg";
import { getFullDate } from "@/utils/util";
import "./PersonalRating.scss";

interface Props {
  ratings: DetailUserRating[];
  countStars: number;
  countCompletedOrders: number;
}

export default function PersonalRating({
  ratings,
  countStars,
  countCompletedOrders,
}: Props) {
  const { t } = useTranslation("p_profile", { keyPrefix: "index" });

  const history = useHistory();

  function openUserProfile(slug: string) {
    history.push(
      urls.profile.index + urls.profile.item.replace(":profileId", slug)
    );
  }

  if (countCompletedOrders < MIN_COMPLETED_ADS_RATING) {
    return (
      <article className="umstud-personal-rating-panel">
        <header className="umstud-personal-rating-panel__header">
          <h3 className="umstud-personal-rating-panel__header_head">
            {t("rating")}
          </h3>
          <p className="umstud-personal-rating-panel__header_description">
            {t("notRating", { count: MIN_COMPLETED_ADS_RATING })}
          </p>
        </header>
      </article>
    );
  }

  return (
    <article className="umstud-personal-rating-panel">
      <header className="umstud-personal-rating-panel__header">
        <h3 className="umstud-personal-rating-panel__header_head">
          {t("rating")} ({countStars})
        </h3>
        <p className="umstud-personal-rating-panel__header_description">
          {t("completedOrders", { count: countCompletedOrders })}
        </p>
        <div className="umstud-personal-rating-panel__header-stars">
          {[...Array(Math.round(countStars))].map((_, index) => (
            <div key={index} className="blue-star fill">
              <FillStarSvg />
            </div>
          ))}
          {[...Array(5 - Math.round(countStars))].map((_, index) => (
            <div key={index} className="blue-star">
              <HollowStarSvg />
            </div>
          ))}
        </div>
      </header>
      <div className="reviews-profile">
        {ratings.map((rating) => (
          <div key={rating.id} className="reviews-profile__item">
            <div className="reviews-profile__item-info">
              <div className="reviews-profile__item-user">
                <AvatarUser
                  classNameImg="reviews-profile__item-user_img"
                  username={rating.author.username}
                  photo={rating.author.photo || null}
                />
                <div className="reviews-profile__item-user-info">
                  <h4
                    className="reviews-profile__item-user_head"
                    onClick={() => openUserProfile(rating.author.slug)}
                  >
                    {rating.author.username}
                  </h4>
                  <p className="reviews-profile__item-user_date">
                    {getFullDate(new Date(rating.created_at))}
                  </p>
                </div>
              </div>
              <div className="profile-index__stars">
                {[...Array(Math.round(rating.count || 0))].map((_, index) => (
                  <div key={index} className="blue-star fill">
                    <FillStarSvg />
                  </div>
                ))}
                {[...Array(5 - Math.round(rating.count || 0))].map(
                  (_, index) => (
                    <div key={index} className="blue-star">
                      <HollowStarSvg />
                    </div>
                  )
                )}
              </div>
            </div>
            <p className="reviews-profile__item-message">{rating.message}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
