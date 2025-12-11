import { useState, useCallback } from "react";
import * as yup from "yup";
import { InputState } from "@/components/form/input/Input";

type ValidationSchema<T> = yup.ObjectSchema<yup.AnyObject>;

interface UseFormValidationOptions<T> {
  schema: ValidationSchema<T>;
  initialValues: T;
  passwordStrengthCheck?: (value: string) => {
    state: Exclude<InputState, "normal" | "hover">;
    message: string;
  };
}

interface FieldState {
  state: InputState;
  message: string;
}

export const useFormValidation = <T extends Record<string, any>>({
  schema,
  initialValues,
  passwordStrengthCheck,
}: UseFormValidationOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );

  const getFieldState = useCallback(
    (field: keyof T): FieldState => {
      const value = values[field] as string;
      const isTouched = touched[field];
      const fieldError = errors[field];

      // Показуємо normal стан якщо поле порожнє і не торкнуте
      if (!value && !isTouched) {
        return { state: "normal", message: "" };
      }

      // Показуємо error стан якщо є помилка валідації
      if (fieldError) {
        return { state: "error", message: fieldError };
      }

      // Якщо поле має значення, визначаємо стан на основі валідації
      if (value) {
        try {
          schema.validateSyncAt(field as string, { [field]: value });

          // Спеціальна логіка для пароля (якщо є passwordStrengthCheck)
          if (
            field === "password" &&
            passwordStrengthCheck &&
            typeof value === "string"
          ) {
            const strength = passwordStrengthCheck(value);
            return { state: strength.state, message: strength.message };
          }

          // Для інших полів показуємо correct якщо валідне
          return { state: "correct", message: "" };
        } catch {
          // Якщо валідація не пройшла, показуємо error тільки якщо поле торкнуте
          return { state: isTouched ? "error" : "normal", message: "" };
        }
      }

      return { state: "normal", message: "" };
    },
    [values, touched, errors, schema, passwordStrengthCheck]
  );

  const validateField = useCallback(
    async (field: keyof T, value: any) => {
      if (!touched[field] && !value) {
        return;
      }

      try {
        await schema.validateAt(field as string, { [field]: value });
        // Очищаємо помилку якщо валідація пройшла
        if (errors[field]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      } catch (err) {
        if (err instanceof yup.ValidationError && err.path === field) {
          setErrors((prev) => ({
            ...prev,
            [field]: err.message,
          }));
        }
      }
    },
    [schema, touched, errors]
  );

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Очищаємо помилку одразу коли користувач починає вводити
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      // Валідуємо в реальному часі якщо поле було торкнуте
      if (touched[field]) {
        validateField(field, value);
      }
    },
    [errors, touched, validateField]
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      if (!touched[field]) {
        setTouched((prev) => ({ ...prev, [field]: true }));
      }
      validateField(field, values[field]);
    },
    [touched, values, validateField]
  );

  const validateAll = useCallback(async (): Promise<boolean> => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({} as Record<keyof T, string>);
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<keyof T, string> = {} as Record<
          keyof T,
          string
        >;
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path as keyof T] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  }, [schema, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    getFieldState,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
    setErrors,
  };
};
