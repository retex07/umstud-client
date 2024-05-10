export function convertDataToFormData(form: Record<string, unknown>): FormData {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value) && key === "skills") {
        value.forEach((skill) =>
          formData.append(`${key}`, skill.value.toString())
        );
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}`, item.toString()));
      } else {
        formData.append(key, value.toString());
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
