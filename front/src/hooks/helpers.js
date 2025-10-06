import toast from "react-hot-toast";

export const validateForm = (fields, state) => {
  const emptyField = Object.keys(state).find((field) => !state?.[field]);

  if (emptyField) {
    const fieldLabel = fields.find((item) => item.name == emptyField).label;
    toast.error(`O campo ${fieldLabel} é obrigatório.`);
    return true;
  }

  return false;
};
