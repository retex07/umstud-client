import { call, put, takeLatest } from "redux-saga/effects";

import { AdGet, OptionSelect } from "@/api/handlers/order/types";
import { ExtraArguments } from "@/api/types";
import { getChat, setChatIsLoading } from "@/store/actions/chat";
import {
  getCategoriesAndTypes,
  getMyOrders,
  getMyWorks,
  getOrder,
  getOrders,
  requestConfirmOrderReady,
  setCategories,
  setIsLoadingMyOrders,
  setIsLoadingMyWorks,
  setIsLoadingOrderItem,
  setIsLoadingOrders,
  setMyOrdersList,
  setMyWorksList,
  setOrderItem,
  setOrders,
  setResponder,
  setTypes,
} from "@/store/actions/order";

function* setResponderSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof setResponder>
) {
  try {
    yield call(api.order.setExecutor, payload);
    if (payload.callback) {
      payload.callback();
    }

    yield put(getMyOrders());
  } catch (error) {
    console.error("[order setResponderSaga saga error]:", error);
  }
}

function* getMyOrdersSaga({ api }: ExtraArguments) {
  try {
    yield put(setIsLoadingMyOrders(true));
    const myOrders: AdGet[] = yield call(api.order.getMyOrders);
    yield put(setMyOrdersList(myOrders));
  } catch (error) {
    console.error("[order getOrdersSaga saga error]:", error);
  } finally {
    yield put(setIsLoadingMyOrders(false));
  }
}

function* sagaGetMyWorks({ api }: ExtraArguments) {
  try {
    yield put(setIsLoadingMyWorks(true));
    const myWorks: AdGet[] = yield call(api.order.getMyWorks);
    yield put(setMyWorksList(myWorks));
  } catch (error) {
    console.error("[order sagaGetMyWorks saga error]:", error);
  } finally {
    yield put(setIsLoadingMyWorks(false));
  }
}

function* getOrdersSaga({ api }: ExtraArguments) {
  try {
    yield put(setIsLoadingOrders(true));
    const orders: AdGet[] = yield call(api.order.getOrders);
    yield put(setOrders(orders));
  } catch (error) {
    console.error("[order getOrdersSaga saga error]:", error);
  } finally {
    yield put(setIsLoadingOrders(false));
  }
}

function* getOrderSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof getOrder>
) {
  try {
    yield put(setIsLoadingOrderItem(true));
    const order: AdGet = yield call(api.order.getOrder, payload);
    yield put(setOrderItem(order));
  } catch (error) {
    console.error("[order getOrderSaga saga error]:", error);
  } finally {
    yield put(setIsLoadingOrderItem(false));
  }
}

function* getCategoriesAndTypesSaga({ api }: ExtraArguments) {
  try {
    const categories: OptionSelect[] = yield call(api.order.getCategories);
    const types: OptionSelect[] = yield call(api.order.getTypes);

    yield put(setCategories(categories));
    yield put(setTypes(types));
  } catch (error) {
    console.error("[order getCategoriesAndTypesSaga saga error]:", error);
  }
}

function* sagaRequestConfirmOrderReady(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof requestConfirmOrderReady>
) {
  try {
    const { orderId, data, chatRoomId, callback } = payload;

    if (chatRoomId) {
      yield put(setChatIsLoading({ isLoading: true, stateId: chatRoomId }));
    }

    yield call(api.order.completedOrder, orderId, data);
    yield put(getOrder(orderId));

    if (chatRoomId) {
      yield put(getChat(chatRoomId));
    }

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("[order sagaRequestConfirmOrderReady saga error]:", error);
  } finally {
    if (payload.chatRoomId) {
      yield put(
        setChatIsLoading({ isLoading: false, stateId: payload.chatRoomId })
      );
    }
  }
}

export default function* order(ea: ExtraArguments) {
  yield takeLatest(setResponder.toString(), setResponderSaga, ea);
  yield takeLatest(getMyOrders.toString(), getMyOrdersSaga, ea);
  yield takeLatest(getMyWorks.toString(), sagaGetMyWorks, ea);
  yield takeLatest(getOrders.toString(), getOrdersSaga, ea);
  yield takeLatest(getOrder.toString(), getOrderSaga, ea);
  yield takeLatest(
    requestConfirmOrderReady.toString(),
    sagaRequestConfirmOrderReady,
    ea
  );
  yield takeLatest(
    getCategoriesAndTypes.toString(),
    getCategoriesAndTypesSaga,
    ea
  );
}
