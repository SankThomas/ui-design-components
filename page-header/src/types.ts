export type Tab = "My parameters" | "Public" | "Configurations";

export type Parameter = {
  id: string;
  name: string;
  value: string;
  description: string;
  visibility: "Private" | "Public";
};

export type ParameterForm = Omit<Parameter, "id">;