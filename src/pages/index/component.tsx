import Button from "components/button";
import CardSlider from "components/cardSlider";
import CardReview from "components/cards/cardReview";
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
          <h2 className="sub-heading">Популярные виды работ</h2>
          <p className="description">Качетсвенные работы в короткие сроки</p>
        </header>
        <div className="type-work--info-wrapper">
          <CardSlider>
            {WorkTypesMock.map((typeWork) => (
              <CardTypeWork
                key={typeWork.id}
                title={typeWork.title}
                startPrice={typeWork.startPrice}
                startDeadline={typeWork.startDeadline}
              />
            ))}
          </CardSlider>
          <div className="type-work--problems">
            <h3 className="type-work--problems-title">Проблемы с учёбой?</h3>
            <p className="type-work--problems-subtitle">
              Обратитесь за помощью к студентам, вы получите готовую работу с
              соблюдением всех требований вашего преподавателя
            </p>
            <div className="type-work--action">
              <Button label="Посмотреть все работы" size="middle" />
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
