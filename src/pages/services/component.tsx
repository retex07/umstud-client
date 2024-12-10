import Button from "components/button";
import Swiper from "components/swiper";
import { services, servicesPremium } from "mocks/servicesMock";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import urls from "services/router/urls";
import "./styles.scss";

export default function ServicesPage() {
  const { t } = useTranslation("p_services");
  const history = useHistory();

  function goToCreateOrder() {
    history.push(urls.orders.index + urls.orders.create);
  }

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-content-title">{t("header")}</header>
        <div className="extra-services">
          <Swiper showSlides={2}>
            {servicesPremium.map((service) => (
              <div key={service.id} className="extra-services__card">
                <div className="extra-services__card-info">
                  <h3 className="extra-services__card-title">
                    {service.title}
                  </h3>
                  <p>{service.description}</p>
                </div>
                <Button fullWidth color="blue-dark" size="small">
                  {t("choose")}
                </Button>
              </div>
            ))}
          </Swiper>
        </div>
        <div className="services-list">
          {services.map((service) => (
            <div key={service.id} className="services-list__item">
              <h3 className="services-list__item-title">{service.name}</h3>
              <div className="services-list__item-info">
                <div className="services-list__item-info small">
                  <h4 className="services-list__item-info-title">
                    {t("duration")}
                  </h4>
                  <p className="services-list__item-info-description">
                    {service.duration}
                  </p>
                </div>
                <div className="services-list__item-info small">
                  <h4 className="services-list__item-info-title">
                    {t("price")}
                  </h4>
                  <p className="services-list__item-info-description">
                    {service.price}
                  </p>
                </div>
                <Button onClick={goToCreateOrder} size="small">
                  {t("order")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
