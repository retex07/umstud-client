import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { CreateDiscussion_Body } from "@/api/handlers/forum/types";
import Button from "@/components/button";
import Field from "@/components/formElements/field";
import TextareaField from "@/components/formElements/textareaField/TextareaField";
import { createDiscussion } from "@/store/actions/forum";
import { selectIsLoadingForum } from "@/store/selectors/forum";
import "../styles.scss";

export default function CreateDiscussionPage() {
  const { t } = useTranslation("p_forum");
  const { t: tRules } = useTranslation("translation", {
    keyPrefix: "form.rules",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const createDiscussionLoading = useSelector(selectIsLoadingForum);

  const { control, handleSubmit, formState, setError } =
    useForm<CreateDiscussion_Body>({
      mode: "onSubmit",
    });

  function onSubmitCreateDiscussion(body: CreateDiscussion_Body) {
    dispatch(createDiscussion({ body, setError }));
  }

  return (
    <div id="page" className="page-container">
      <div className="page-content-wrapper">
        <header className="page-forum-create__header">
          <h1 className="page-content-title">{t("create.title")}</h1>
          <span
            className="page-forum-create__actions_cancel"
            onClick={() => history.goBack()}
          >
            {t("actions.cancel")}
          </span>
        </header>
        <form
          className="page-forum-create__form"
          onSubmit={handleSubmit(onSubmitCreateDiscussion)}
        >
          <div className="page-forum-create__form-content">
            <Field
              name="title"
              control={control}
              fullWidth
              label={t("create.fields.title.title")}
              placeholder={t("create.fields.title.press")}
              readonly={formState.isSubmitting || createDiscussionLoading}
              rules={{
                required: tRules("required"),
              }}
            />
            <TextareaField
              name="description"
              control={control}
              label={t("create.fields.description.title")}
              placeholder={t("create.fields.description.press")}
              readonly={formState.isSubmitting || createDiscussionLoading}
              fullWidth
              rules={{
                required: tRules("required"),
              }}
            />
          </div>
          <div className="page-forum-create__form-actions">
            <Button
              color="green"
              label={t("post")}
              type="submit"
              isLoading={formState.isSubmitting || createDiscussionLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
