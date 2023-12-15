export function base64toFile(
  base64String: string,
  filename: string,
  mimeType: string
) {
  // Remove the data:image/<mimeType>;base64, prefix
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  // Create a Blob from the base64 data
  const blob = new Blob([Buffer.from(base64Data, "base64")], {
    type: mimeType,
  });

  // Create a File from the Blob
  const file = new File([blob], filename, { type: mimeType });

  return file;
}
