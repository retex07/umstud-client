import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import AvatarUser from "@/components/avatarUser";
import PageLoader from "@/components/loaders/pageLoader";
import NoDataComponent from "@/components/noData";
import PanelForumList from "@/components/panels/activeDiscussions";
import PanelForumCreate from "@/components/panels/forumCreate";
import PanelOrderCreate from "@/components/panels/orderCreate";
import PanelOrderServices from "@/components/panels/popularServices";
import { MIN_COMPLETED_ADS_RATING } from "@/constants/config";
import urls from "@/services/router/urls";
import { ReactComponent as StarSvg } from "@/static/images/fill-star.svg";
import { getDiscussionList } from "@/store/actions/forum";
import { getRatingList } from "@/store/actions/rating";
import { selectDiscussions } from "@/store/selectors/forum";
import {
  selectIsLoadingRating,
  selectRatingList,
} from "@/store/selectors/rating";
import "./RatingPage.scss";

export default function RatingPage() {
  const { t } = useTranslation("p_rating");

  const dispatch = useDispatch();
  const history = useHistory();

  const discussions = useSelector(selectDiscussions);
  const isLoading = useSelector(selectIsLoadingRating);
  const ratingList = useSelector(selectRatingList);

  useEffect(() => {
    dispatch(getRatingList());
    dispatch(getDiscussionList());
  }, []);

  function openUserProfile(slug: string) {
    history.push(
      urls.profile.index + urls.profile.item.replace(":profileId", slug)
    );
  }

  function getFullRating(rating: number) {
    if (rating.toString().includes(".")) {
      return rating.toFixed(2);
    }

    return rating + ".0";
  }

  return (
    <div id="page" className="page-container with-panels">
      <div className="flex-panels">
        <PanelOrderCreate />
        <PanelOrderServices />
      </div>
      <div className="page-content-wrapper">
        <header>
          <h3 className="page-content-title">{t("title")}</h3>
        </header>
        {isLoading && <PageLoader />}
        <div className="rating-page__list">
          {!ratingList.length && <NoDataComponent />}
          {ratingList.map(
            (ratingUser, index) =>
              index < 7 &&
              ratingUser.completed_ads_count >= MIN_COMPLETED_ADS_RATING && (
                <div key={ratingUser.id} className="rating-page__item">
                  <div className="rating-page__item-info-user">
                    <div className="rating-page__item-info-user-profile">
                      <AvatarUser
                        classNameImg="rating-page__item-info-user-profile_img"
                        photo={ratingUser.photo || null}
                        username={ratingUser.username}
                      />
                      <div className="rating-page__item-info-user-profile-info">
                        <h4
                          className="rating-page__item-info-user-profile_head"
                          onClick={() => openUserProfile(ratingUser.slug)}
                        >
                          {ratingUser.last_name} {ratingUser.first_name}
                        </h4>
                        <span className="rating-page__item-info-user-profile_username">
                          {ratingUser.username}
                        </span>
                      </div>
                    </div>
                    <div className="rating-page__item-info-user-profile-rating">
                      <StarSvg />
                      <span>{getFullRating(ratingUser.average_rating)}</span>
                    </div>
                  </div>
                  <div className="rating-page__item-info-user">
                    <div className="rating-page__item-info-user-completed">
                      <span className="rating-page__item-info-user-completed_text">
                        {t("item.completed")}
                      </span>
                      <span className="rating-page__item-info-user-completed_text">
                        {ratingUser.completed_ads_count}
                      </span>
                    </div>
                    <span
                      className="rating-page__item-info-user-completed_reviews"
                      onClick={() => openUserProfile(ratingUser.slug)}
                    >
                      {t("item.reviews")}
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="flex-panels">
        <PanelForumCreate />
        {discussions.length > 0 && <PanelForumList discussions={discussions} />}
      </div>
    </div>
  );
}
