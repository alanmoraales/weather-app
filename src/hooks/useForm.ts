import { useState } from "react";
import {
  useForm as useHookForm,
  Resolver,
  UnpackNestedValue,
  FieldValues,
  DeepPartial,
} from "react-hook-form";
import useNotification from "./useNotification";
import type { IFormMethods } from "@declarations/common";

interface IUseForm<T extends FieldValues> {
  resolver?: Resolver<T, object>;
  onSubmit: (values: UnpackNestedValue<T>) => Promise<void>;
  onSuccess?: () => void;
  successMessage?: string;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  resetAfterSuccessSubmit?: boolean;
  displaySuccessMessage?: boolean;
}

const useForm = <T extends FieldValues>({
  resolver,
  onSubmit,
  onSuccess = () => {},
  successMessage = "",
  defaultValues,
  resetAfterSuccessSubmit = true,
  displaySuccessMessage = true,
}: IUseForm<T>): IFormMethods<T> => {
  const { handleSubmit, reset, ...restOfValues } = useHookForm<T>({
    resolver,
    defaultValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notify = useNotification();

  const submit = handleSubmit(async (values) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      if (resetAfterSuccessSubmit) {
        reset();
      }
      if (displaySuccessMessage) {
        notify.success({
          description: successMessage,
        });
      }
      onSuccess();
    } catch (error) {
      notify.error({
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    submit,
    isSubmitting,
    reset,
    ...restOfValues,
  };
};

export default useForm;
