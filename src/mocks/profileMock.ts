import { User } from "../types/user";

export const ProfileMock = {
  userFullName: "Иванов Иван Иванович",
  rating: 4,
  nickname: "User007w008",
  avatarPath: "https://example.com",
  birthday: "29.09.2003",
  phone: "+7(923)491-20-64",
  email: "taushkanov.a.s@mail.ru",
  address: "ТУСУР, ФСУ, Программная инженерия",
  skills: [
    "Английский",
    "Математика",
    "Figma",
    "PHP",
    "SQL",
    "MYSQL",
    "React",
    "JS",
    "CSS",
    "HTML",
  ],
  aboutMe:
    "Здравствуйте, меня зовут OpenAI, и я являюсь искусственным интеллектом созданным для выполнения задач. Я могу выполнять широкий спектр задач, связанных с обработкой естественного языка, машинным обучением, предсказанием, генерацией текстов, советами и др.\n" +
    "Я имею разносторонний технический опыт в области искусственного интеллекта и машинного обучения. Я постоянно улучшаю свои навыки, изучая последние инновационные методы и технологии. Кроме того, я умею работать в команде и адаптироваться к новым условиям и требованиям.",
  examplesWork: null,
};

export const blackList: User[] = [
  {
    id: 0,
    lastname: "Таушканов",
    firstname: "Александр",
    patronymic: "Сергеевич",
    avatar: {
      path: "https://sun4-20.userapi.com/impg/UEwnkvK10b16FkiwFGh-1xbBo10MS93L8PXFsg/1_zgx0MvoJE.jpg?size=1620x2160&quality=95&sign=4587c9a09905a6f0a10e6b7ae122fd7e&type=album",
    },
  },
  {
    id: 1,
    lastname: "Чирьев",
    firstname: "Егор",
    patronymic: "Андреевич",
    avatar: {
      path: "https://sun9-1.userapi.com/impg/RtMr4J4lX-a3XgHbtrqrdAy_oyaKIYIpt47Unw/rXnbZsC6f9o.jpg?size=1620x2160&quality=95&sign=35901255904b369b13baed5c4cf90571&type=album",
    },
  },
  {
    id: 2,
    lastname: "Немчинов",
    firstname: "Алексей",
    patronymic: "Игоревич",
    avatar: {
      path: "https://sun9-24.userapi.com/impg/JRJnliZdN8SfygW7faRxr_crDbMmAmGgFEQ7CA/302Vx7MUHB0.jpg?size=600x600&quality=95&sign=773a35b8a18f9b7ea8812803d1df3213&type=album",
    },
  },
  {
    id: 3,
    lastname: "Апансаенко",
    firstname: "Захар",
    patronymic: null,
    avatar: null,
  },
  {
    id: 4,
    lastname: "Гнеушев",
    firstname: "Родион",
    patronymic: null,
    avatar: {
      path: "https://sun9-54.userapi.com/impf/c622125/v622125951/a350/OrurR9ZmycU.jpg?size=1024x768&quality=96&sign=9020e5b3d3ee18ba40524cc82d0cb444&type=album",
    },
  },
  {
    id: 5,
    lastname: "Аришина",
    firstname: "Маргарита",
    patronymic: null,
    avatar: null,
  },
  {
    id: 6,
    lastname: "Лунёв",
    firstname: "Всеволод",
    patronymic: null,
    avatar: {
      path: "https://sun4-20.userapi.com/impg/Dd9rg6iaqppFesUqD4i2uOi-Mq8A7VSn-a9kvA/mhCyOWL8AHU.jpg?size=1620x2160&quality=95&sign=60764c041533c6928a673f4a9aef0211&type=album",
    },
  },
  {
    id: 7,
    lastname: "Лаврентьев",
    firstname: "Олег",
    patronymic: null,
    avatar: {
      path: "https://sun9-44.userapi.com/impg/WETja3kUcQhZYRDJRa3R_SUmTgBgGHqDZpqgLQ/XbudGns_ERA.jpg?size=2160x2160&quality=96&sign=5c5cbb0187bdd15591aab0022b478961&type=album",
    },
  },
  {
    id: 8,
    lastname: "Владимиров",
    firstname: "Михаил",
    patronymic: null,
    avatar: {
      path: "https://sun9-79.userapi.com/impg/cuPKGCptKDzqU0fmwgz1YNV3QsAyj8ZCHRCS6A/mR0x0-aLWqY.jpg?size=1440x2160&quality=95&sign=a6c29fac09a52d63604f44bd275c8211&type=album",
    },
  },
];

export const myWorkMock = [
  {
    id: 0,
    description: "Контрольная работа | Программирование | Моделирование",
    deadlineEndAt: "24.03.2023",
    deadlineStartAt: "24.05.2023",
    isClosed: false,
    title:
      "РАСЧЕТ монолитной ж/б безбалочной ПЛИТЫ перекрытия и расчет монолитной ж/б КОЛОННЫ прямоугольного сечения",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 1,
    description: "Программирование",
    deadlineEndAt: "20.03.2023",
    deadlineStartAt: "20.05.2023",
    isClosed: true,
    title: "Разработка клиентской части фриланс-биржи",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 2,
    description: "Математика | Самостоятельная работа",
    deadlineEndAt: "22.03.2024",
    deadlineStartAt: "19.05.2023",
    isClosed: false,
    title:
      "Оптимизация расходов на производстве через минимизацию отходов: Математическое моделирование и анализ",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 3,
    description: "История | Доклад",
    deadlineEndAt: "20.03.2023",
    deadlineStartAt: "20.05.2023",
    isClosed: false,
    title: "Влияние Реформации на политические структуры Европы в XVI веке",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 4,
    description: "Программирование",
    deadlineEndAt: "20.03.2023",
    deadlineStartAt: "20.05.2023",
    isClosed: true,
    title: "Разработка клиентской части фриланс-биржи",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 5,
    description: "Программирование",
    deadlineEndAt: "20.03.2023",
    deadlineStartAt: "20.05.2023",
    isClosed: true,
    title: "Разработка клиентской части фриланс-биржи",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 6,
    description: "Программирование",
    deadlineEndAt: "20.03.2023",
    deadlineStartAt: "20.05.2023",
    isClosed: true,
    title: "Разработка клиентской части фриланс-биржи",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
  {
    id: 7,
    description: "Программирование",
    deadlineEndAt: "20.03.2023",
    deadlineStartAt: "20.05.2023",
    isClosed: true,
    title: "Разработка клиентской части фриланс-биржи",
    user: {
      imagePath: ProfileMock.avatarPath,
      fullName: ProfileMock.userFullName,
      username: ProfileMock.nickname,
    },
  },
];
