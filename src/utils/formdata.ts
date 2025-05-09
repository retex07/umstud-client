import isNil from "lodash/isNil";

export function convertDataToFormData(form: Record<string, unknown>): FormData {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (!isNil(value)) {
      switch (true) {
        case Array.isArray(value) && key === "skills":
          value.forEach((skill) =>
            formData.append(`${key}`, skill.value.toString())
          );
          break;

        case Array.isArray(value):
          value.forEach((item) => formData.append(`${key}`, item.toString()));
          break;

        case key === "file":
          // @ts-ignore
          formData.append(key, value);
          break;

        default:
          formData.append(key, value.toString());
          break;
      }
    }
  });

  return formData;
}

export function blobToFile(
  blob: Blob,
  fileName?: string,
  type?: string,
  lastModified = Date.now()
) {
  return new File([blob], fileName || lastModified.toString(), {
    type: type || blob.type,
    lastModified: lastModified,
  });
}
