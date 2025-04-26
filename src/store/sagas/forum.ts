import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  CreateDiscussion_Body,
  CreateDiscussion_Response,
  Discussion,
} from "@/api/handlers/forum/types";
import { ExtraArguments } from "@/api/types";
import urls from "@/services/router/urls";
import {
  createDiscussion,
  getDiscussion,
  getDiscussionList,
  sendAnswer,
  setDiscussion,
  setDiscussionList,
  setIsLoading,
} from "@/store/actions/forum";

function* sagaGetDiscussionList({ api }: ExtraArguments) {
  try {
    yield put(setIsLoading(true));

    const discussions: Discussion[] = yield call(api.forum.getDiscussions);

    yield put(setDiscussionList(discussions));
  } catch (error) {
    console.error("[forum sagaGetDiscussionList saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* sagaCreateDiscussion(
  { api, history }: ExtraArguments,
  { payload }: ReturnType<typeof createDiscussion>
) {
  try {
    yield put(setIsLoading(true));

    const discussion: CreateDiscussion_Response = yield call(
      api.forum.createDiscussion,
      payload.body
    );

    history.push(
      urls.forum.index +
        urls.forum.item.replace(":discussionId", discussion.id.toString())
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const keys = Object.keys(error.response.data) as Array<
        keyof CreateDiscussion_Body
      >;

      keys.forEach((key) => {
        payload.setError(key, {
          message: error.response?.data[key]?.[0],
        });
      });
    }

    console.error("[forum sagaCreateDiscussion saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* sagaGetDiscussion(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof getDiscussion>
) {
  try {
    yield put(setIsLoading(true));

    const discussion: Discussion = yield call(api.forum.getDiscussion, payload);

    yield put(setDiscussion(discussion));
  } catch (error) {
    console.error("[forum sagaCreateDiscussion saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* sagaSendAnswer(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof sendAnswer>
) {
  try {
    yield call(api.forum.createComment, payload.discussionId, payload.body);
    yield put(getDiscussion(payload.discussionId));
  } catch (error) {
    console.error("[forum sagaSendAnswer saga error]:", error);
  }
}

export default function* forum(ea: ExtraArguments) {
  yield takeLatest(getDiscussionList.toString(), sagaGetDiscussionList, ea);
  yield takeLatest(createDiscussion.toString(), sagaCreateDiscussion, ea);
  yield takeLatest(getDiscussion.toString(), sagaGetDiscussion, ea);
  yield takeLatest(sendAnswer.toString(), sagaSendAnswer, ea);
}
