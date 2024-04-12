import Button from "components/button";
import CardReview from "components/cards/cardReview";
import Swiper from "components/swiper";
import { ReviewsMock } from "mocks/reviewsMock";
import { WorkTypesMock } from "mocks/workTypeMock";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as StarSvg } from "static/images/fill-star.svg";
import { ReactComponent as ManSvg } from "static/images/index/man-with-board.svg";
import { ReactComponent as PhoneOneSvg } from "static/images/index/phone-one.svg";
import { ReactComponent as PhoneThreeSvg } from "static/images/index/phone-three.svg";
import { ReactComponent as PhoneTwoSvg } from "static/images/index/phone-two.svg";
import { ReactComponent as MoneySvg } from "static/images/money.svg";
import { ReactComponent as WarnSvg } from "static/images/warn.svg";

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
          <Swiper showSlides={4}>
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
      <section className="section-advantages section-advantages--wrapper">
        <h3 className="section-advantages--title">{t("advantages.title")}</h3>
        <div className="section-advantages--about">
          <div className="section-advantages--info warn">
            <WarnSvg />
            <p className="section-advantages--subtitle">
              {t("advantages.plagiarism")}
            </p>
          </div>
          <div className="section-advantages--info">
            <StarSvg />
            <p className="section-advantages--subtitle">
              {t("advantages.rating")}
            </p>
          </div>
          <div className="section-advantages--info">
            <MoneySvg />
            <p className="section-advantages--subtitle">
              {t("advantages.payment")}
            </p>
          </div>
        </div>
      </section>
      <section className="section-how-work">
        <h3 className="section-how-work--title">{t("howWork.title")}</h3>
        <div className="section-how-work--points">
          <div className="section-how-work--block-point">
            <div className="section-how-work--point-info">
              <h4 className="section-how-work--point">1</h4>
              <p className="section-how-work--point-descr">
                {t("howWork.pointOne")}
              </p>
            </div>
            <PhoneOneSvg />
          </div>
          <div className="section-how-work--block-point">
            <div className="section-how-work--point-info">
              <h4 className="section-how-work--point">2</h4>
              <p className="section-how-work--point-descr">
                {t("howWork.pointTwo")}
              </p>
            </div>
            <PhoneTwoSvg />
          </div>
          <div className="section-how-work--block-point">
            <div className="section-how-work--point-info">
              <h4 className="section-how-work--point">3</h4>
              <p className="section-how-work--point-descr">
                {t("howWork.pointThree")}
              </p>
            </div>
            <PhoneThreeSvg />
          </div>
        </div>
      </section>
      <section className="section-reviews section-reviews--wrapper">
        <header className="section-reviews--header">
          <h2 className="section-reviews--sub-heading">{t("reviews.title")}</h2>
          <p className="section-reviews--description">{t("reviews.rating")}</p>
        </header>
        <div className="section-reviews--cards">
          <Swiper>
            {ReviewsMock.map((item, index) => (
              <CardReview
                key={index}
                date={item.date}
                author={item.author}
                comment={item.comment}
                countStars={item.countStars}
              />
            ))}
          </Swiper>
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
