import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as LogoSvg } from "static/images/logo.svg";
import { ReactComponent as MailSvg } from "static/images/mail.svg";
import { ReactComponent as OkSvg } from "static/images/odnoklassniki.svg";
import { ReactComponent as PhoneSvg } from "static/images/phone.svg";
import { ReactComponent as TelegramSvg } from "static/images/telegram.svg";
import { ReactComponent as VkSvg } from "static/images/vk.svg";
import "./styles.scss";

export default function Footer() {
  const { t } = useTranslation("b_footer");

  return (
    <footer className="footer footer--wrapper">
      <section className="footer--info-section">
        <dl>
          <dt className="footer--definition-term">{t("navigation.title")}</dt>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("navigation.main")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("navigation.services")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("navigation.orders")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("navigation.forum")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("navigation.account")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("navigation.rating")}
            </a>
          </dd>
        </dl>
        <LogoSvg />
      </section>
      <section className="footer--info-section">
        <dl>
          <dt className="footer--definition-term">{t("socialNetwork")}</dt>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              <TelegramSvg />
            </a>
            <a className="footer--definition-details--description">
              <VkSvg />
            </a>
            <a className="footer--definition-details--description">
              <OkSvg />
            </a>
          </dd>
        </dl>
        <dl>
          <dt className="footer--definition-term">{t("contacts")}</dt>
          <dd className="footer--definition-details">
            <MailSvg />
            <span className="footer--definition-details--description">
              support@helpup.ru
            </span>
          </dd>
          <dd className="footer--definition-details">
            <PhoneSvg />
            <span className="footer--definition-details--description">
              +7(923)491-20-64
            </span>
          </dd>
        </dl>
        <p className="footer--description-system">©2023 «УмСтуд»</p>
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
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("other.aboutPayment")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("other.secureTransaction")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("other.guarantees")}
            </a>
          </dd>
          <dd className="footer--definition-details">
            <a className="footer--definition-details--description">
              {t("other.reviews")}
            </a>
          </dd>
        </dl>
      </section>
    </footer>
  );
}
