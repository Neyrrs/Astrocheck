export const successResponse = (data, message = "Berhasil") => ({
  status: "success",
  message,
  data,
});

export const errorResponse = (message = "Terjadi kesalahan", code = 500) => ({
  status: "error",
  message,
  code,
});
