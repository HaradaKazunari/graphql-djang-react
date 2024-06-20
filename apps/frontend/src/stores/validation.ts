import { create } from "zustand";

export type ValidationMessage = {
  key: string;
  message: string;
  type?: string;
};

type ValidationsStore = {
  validations: ValidationMessage[];
  addValidation: (validation: Omit<ValidationMessage, "id">) => void;
  addValidations: (validations: Omit<ValidationMessage, "id">[]) => void;
  clearValidations: () => void;
};

export const useValidationStore = create<ValidationsStore>((set) => ({
  validations: [],
  addValidation: (validation) => {
    set(() => ({
      validations: [validation],
    }));
  },
  addValidations: (validations) => {
    set(() => ({
      validations: validations,
    }));
  },
  clearValidations: () => {
    set(() => ({
      validations: [],
    }));
  },
}));
