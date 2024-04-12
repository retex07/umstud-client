import Button from "components/button";
import CardReview from "components/cards/cardReview";
import Swiper from "components/swiper";
import { ReviewsMock } from "mocks/reviewsMock";
import { WorkTypesMock } from "mocks/workTypeMock";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as ManSvg } from "static/images/index/man-with-board.svg";

import CardTypeWork from "./components/cardTypeWork/component";
import "./styles.scss";

export default function IndexPage() {
  const { t } = useTranslation("p_index");

  return (
    <main id="page" className="index-page-container">
      <section className="section-welcome">
        <div className="section-welcome--wrapper">
          <ManSvg />
          <div className="section-welcome--info-block">
            <h1 className="main-heading">{t("title")}</h1>
            <h2 className="heading">{t("subtitle")}</h2>
            <div>
              <Button label={t("goWork")} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-container container">
        <header className="type-work--header">
          <h2 className="sub-heading">{t("work.popular")}</h2>
          <p className="description">{t("work.quality")}</p>
        </header>
        <div className="type-work--info-wrapper">
          <Swiper>
            {WorkTypesMock.map((typeWork) => (
              <CardTypeWork
                key={typeWork.id}
                title={typeWork.title}
                startPrice={typeWork.startPrice}
                startDeadline={typeWork.startDeadline}
              />
            ))}
          </Swiper>
          <div className="type-work--problems">
            <h3 className="type-work--problems-title">{t("trouble")}</h3>
            <p className="type-work--problems-subtitle">{t("helpers")}</p>
            <div className="type-work--action">
              <Button label={t("viewWorks")} size="middle" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-reviews section-reviews--wrapper">
        <header className="section-reviews--header">
          <h2 className="sub-heading">{t("reviews.title")}</h2>
          <p className="section-reviews--description">{t("reviews.rating")}</p>
        </header>
        <div className="section-reviews--cards">
          {ReviewsMock.map((item, index) => (
            <CardReview
              key={index}
              date={item.date}
              author={item.author}
              comment={item.comment}
              countStars={item.countStars}
            />
          ))}
        </div>
      </section>
      <section className="section-answer-questions container">
        <header className="section-answer-questions--header">
          <h2 className="sub-heading">{t("support.title")}</h2>
          <p className="description">{t("support.description")}</p>
        </header>
        <div>
          <Button label={t("support.sendQuestion")} size="middle" />
        </div>
      </section>
    </main>
  );
}
