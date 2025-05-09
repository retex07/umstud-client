import { UserStars } from "@/api/handlers/rating/types";

export const ratingListMock: UserStars[] = [
  {
    id: 0,
    username: "retex07",
    first_name: "Александр",
    last_name: "Таушканов",
    slug: "retex07",
    photo:
      "https://storage.yandexcloud.net/media-fastapi-todo/retex07/photo/669e6428-3af9-4eb1-80d2-81edf25ac349.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEhAPlWVnlGqK7_YWqklQm%2F20250509%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250509T150207Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1a8ae021007665f5b63878175d0d2cf0891b13b068402fe3fd0b808ab942f546",
    average_rating: 4.3,
    completed_ads_count: 3,
  },
  {
    id: 1,
    username: "admin",
    first_name: "Администратор",
    last_name: "Системов",
    slug: "admin",
    photo:
      "https://storage.yandexcloud.net/media-fastapi-todo/admin/photo/04d064f2-5453-44f7-afd8-8967f40a1c43.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEhAPlWVnlGqK7_YWqklQm%2F20250509%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250509T150351Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=cab782578d1fc2e79a36f2f8d866349be7aa836c7258ebe506a275b42979cc3c",
    average_rating: 4.1,
    completed_ads_count: 2,
  },
  {
    id: 2,
    username: "OfficialCrak",
    first_name: "Егор",
    last_name: "Чирьев",
    slug: "officialcrak",
    photo:
      "https://storage.yandexcloud.net/media-fastapi-todo/OfficialCrak/photo/7c48ad16-8d72-43fc-9005-c25fe5003039.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEhAPlWVnlGqK7_YWqklQm%2F20250509%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250509T150549Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1ad00359e439ac87cb2c45a9a9a5f14522ed0bc259756ad1814fc8067db576fb",
    average_rating: 4.0,
    completed_ads_count: 2,
  },
];
