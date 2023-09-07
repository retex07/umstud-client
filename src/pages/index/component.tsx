import React from "react";
import { ReactComponent as ManWithBoardSvg } from "static/images/index/man-with-board.svg";
import { ReactComponent as PhoneOneSvg } from "static/images/index/phone-one.svg";
import { ReactComponent as PhoneThreeSvg } from "static/images/index/phone-three.svg";
import { ReactComponent as PhoneTwoSvg } from "static/images/index/phone-two.svg";

import "./styles.scss";

export default function IndexPage() {
  return (
    <main>
      <div>
        <ManWithBoardSvg />
        <header>
          <h1>Помощь студентам - наша цель</h1>
          <p>Мы имеем дело с превосходными исполнителями учебных работ</p>
        </header>
      </div>
      <section>
        <h2>Популярные виды работ</h2>
        <p>Здесь собраны самые популярные работы, которые обожают студенты</p>
        {[0, 1, 2, 3].map((comment) => (
          <article key={comment}>
            <h3>Контрольная работа</h3>
            <p>Стоимость: </p>
            <p>от 1000р</p>
            <p>Сроки: </p>
            <p>от 1 дня</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Наши преимущества</h2>
        <p>Главные преимущества, которые отделяют нас от конкурентов</p>
        <div>
          <p>Проверка работ на плагиат</p>
          <p>Рейтинговая система</p>
          <p>Оплата не только деньгами</p>
        </div>
      </section>
      <section>
        <h2>Как это работает?</h2>
        <p>Убедитесь в том, что это очень просто!</p>
        <div>
          <div>
            <div>
              <div>1</div>
              <p>Сфотографируй или опиши словами своё задание</p>
            </div>
            <PhoneOneSvg />
          </div>
          <div>
            <div>
              <div>2</div>
              <p>Выбери эксперта и обсуди задание в чате</p>
            </div>
            <PhoneTwoSvg />
          </div>
          <div>
            <div>
              <div>3</div>
              <p>Получай развёрнутые ответы и решения</p>
            </div>
            <PhoneThreeSvg />
          </div>
        </div>
      </section>
      <section>
        <h2>Отзывы наших студентов</h2>
        <p>Общий рейтинг: *****</p>
        <p>34343434 отзывов</p>
        {[0, 1, 2, 3].map((comment) => (
          <article key={comment}>
            <h3>Магомедик</h3>
            <p>Комментарий</p>
            <p>Слишком дорогой сервис!</p>
            <p>3 марта 2023</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Ответы на вопросы</h2>
        <p>
          Не нашли ответа на свой вопрос? Задайте его нам, и мы постараемся
          быстро и четко на него ответить
        </p>
        <button>Задать вопрос</button>
      </section>
    </main>
  );
}
