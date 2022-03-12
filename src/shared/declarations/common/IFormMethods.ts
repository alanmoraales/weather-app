import type { BaseSyntheticEvent } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

interface IFormMethods<T extends FieldValues>
  extends Omit<UseFormReturn<T>, "handleSubmit"> {
  submit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  isSubmitting: boolean;
}

export type { IFormMethods };
