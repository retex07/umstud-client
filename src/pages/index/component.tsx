import Button from "components/button";
import CardReview from "components/cards/cardReview";
import { ReviewsMock } from "mocks/reviewsMock";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as ManSvg } from "static/images/index/man-with-board.svg";
import { ReactComponent as TusurSvg } from "static/images/index/tusur.svg";
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
            <Button label={t("goWork")} />
          </div>
        </div>
      </section>
      <section className="section-container container">
        <header className="partner--header">
          <h2 className="sub-heading">{t("partners.title")}</h2>
          <p className="description">{t("partners.description")}</p>
        </header>
        <div className="partner--list">
          <div className="partner--item">
            <div className="partner--logo">
              <TusurSvg />
            </div>
            <p className="partner--description">{t("partners.tusur")}</p>
          </div>
          <div className="partner--item">
            <div className="partner--logo">
              <img
                src={require("static/images/index/sbi-tusur.png")}
                alt="sbi-tusur"
              />
            </div>
            <p className="partner--description">{t("partners.sbi")}</p>
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
        <Button label={t("support.sendQuestion")} size="middle" />
      </section>
    </main>
  );
}
