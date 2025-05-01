import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CONFIG_SYSTEM, hrefs } from "@/constants/config";
import { ReactComponent as LogoSvg } from "@/static/images/logo.svg";
import { ReactComponent as MailSvg } from "@/static/images/mail.svg";
import { ReactComponent as PhoneSvg } from "@/static/images/phone.svg";
import { ReactComponent as TelegramSvg } from "@/static/images/telegram.svg";
import { ReactComponent as VkSvg } from "@/static/images/vk.svg";
import "./Footer.scss";

export default function Footer() {
  const { t } = useTranslation("b_footer");

  return (
    <footer className="footer footer--wrapper">
      <section className="footer--info-section">
        <dl>
          <dt className="footer--definition-term">{t("navigation.title")}</dt>
          <dd className="footer--definition-details">
            <Link to="/" className="footer--definition-details--description">
              {t("navigation.main")}
            </Link>
          </dd>
          <dd className="footer--definition-details">
            <Link
              to="/services"
              className="footer--definition-details--description"
            >
              {t("navigation.services")}
            </Link>
          </dd>
          <dd className="footer--definition-details">
            <Link
              to="/orders"
              className="footer--definition-details--description"
            >
              {t("navigation.orders")}
            </Link>
          </dd>
          <dd className="footer--definition-details">
            <Link
              to="/forum"
              className="footer--definition-details--description"
            >
              {t("navigation.forum")}
            </Link>
          </dd>
          <dd className="footer--definition-details">
            <Link
              to="/profile"
              className="footer--definition-details--description"
            >
              {t("navigation.account")}
            </Link>
          </dd>
          <dd className="footer--definition-details">
            <Link
              to="/rating"
              className="footer--definition-details--description"
            >
              {t("navigation.rating")}
            </Link>
          </dd>
        </dl>
        <div className="footer--logo-web">
          <LogoSvg />
        </div>
      </section>
      <section className="footer--info-section">
        <dl>
          <dt className="footer--definition-term">{t("socialNetwork")}</dt>
          <dd className="footer--definition-details">
            <a
              className="footer--definition-details--description"
              href={hrefs.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <TelegramSvg />
            </a>
            <a
              className="footer--definition-details--description"
              href={hrefs.vk}
              target="_blank"
              rel="noreferrer"
            >
              <VkSvg />
            </a>
          </dd>
        </dl>
        <dl>
          <dt className="footer--definition-term">{t("contacts")}</dt>
          <dd className="footer--definition-details">
            <MailSvg />
            <span className="footer--definition-details--description">
              {CONFIG_SYSTEM.mail}
            </span>
          </dd>
          <dd className="footer--definition-details">
            <PhoneSvg />
            <span className="footer--definition-details--description">
              {CONFIG_SYSTEM.phone}
            </span>
          </dd>
        </dl>
        <p className="footer--description-system-web">
          {CONFIG_SYSTEM.nameSystem}
        </p>
      </section>
      <section className="footer--info-section">
        <dl>
          <dt className="footer--definition-term">{t("other.title")}</dt>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("other.privacyPolicy")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("other.userAgreement")}
            </a>
          </dd>
        </dl>
        <div className="footer--logo-mobile">
          <LogoSvg />
          <p className="footer--description-system-mobile">
            {CONFIG_SYSTEM.nameSystem}
          </p>
        </div>
      </section>
    </footer>
  );
}
