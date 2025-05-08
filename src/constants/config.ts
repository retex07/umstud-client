export const CONFIG_SYSTEM = {
  nameSystem: `©2023-${new Date().getFullYear()} «УмСтуд»`,
  phone: "+7(923)491-20-64",
  mail: "um-stud@mail.ru",
};

export const hrefs = {
  telegram: "https://t.me/fleelance_exchange_bot",
  vk: "https://vk.com/umstudents",
};

export const adminSymbol = "👑";

export const codeTokenNoValid = "token_not_valid";

export const RegExp = {
  last_name: /^[a-zA-Zа-яА-Я-`']+$/,
  first_name: /^[a-zA-Zа-яА-Я-`']+$/,
  portfolio_title: /^[a-zA-Zа-яА-Я0-9,\s"'./]+$/,
  portfolio_description: /^[a-zA-Zа-яА-Я0-9,\s"'./]+$/,
  patronymic: /^[a-zA-Zа-яА-Я-`']+$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  place_study_work: /^[a-zA-Zа-яА-Я0-9,\s"'./]+$/,
  phone: /^\+?[\s()0-9-]{5,}$/,
  birth_date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
};
