import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  validation?: {
    body?: {
      source?: string;
      keys?: string[];
      message?: string;
    };
  };
  response?: {
    validation?: {
      body?: {
        message?: string;
      };
    };
    message?: string;
  };
}

export const extractApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    const data = apiError.response?.data;

    if (!data) {
      return apiError.message || "An error occurred. Please try again later.";
    }

    // Перевіряємо різні варіанти структури помилки
    return (
      data.validation?.body?.message ||
      data.message ||
      data.error ||
      data.response?.validation?.body?.message ||
      data.response?.message ||
      apiError.message ||
      "An error occurred. Please try again later."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again later.";
};
