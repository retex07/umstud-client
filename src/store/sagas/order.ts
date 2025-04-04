import { call, put, takeLatest } from "redux-saga/effects";

import { AdGet, ExecutorBody, OptionSelect } from "@/api/handlers/order/types";
import { ExtraArguments } from "@/api/types";
import {
  getCategoriesAndTypes,
  getMyOrders,
  getOrder,
  getOrders,
  setCategories,
  setIsLoadingMyOrders,
  setIsLoadingOrderItem,
  setIsLoadingOrders,
  setMyOrdersList,
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
    const res: ExecutorBody = yield call(api.order.setExecutor, payload);
    console.log(res);
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

export default function* order(ea: ExtraArguments) {
  yield takeLatest(setResponder.toString(), setResponderSaga, ea);
  yield takeLatest(getMyOrders.toString(), getMyOrdersSaga, ea);
  yield takeLatest(getOrders.toString(), getOrdersSaga, ea);
  yield takeLatest(getOrder.toString(), getOrderSaga, ea);
  yield takeLatest(
    getCategoriesAndTypes.toString(),
    getCategoriesAndTypesSaga,
    ea
  );
}
