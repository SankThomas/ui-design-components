import type { Parameter, ParameterForm, Tab } from "./types";

export const tabs: Tab[] = ["My parameters", "Public", "Configurations"];

export const PAGE_SIZE = 5;

export const initialParameters: Parameter[] = [
  {
    id: "1",
    name: "auth0_domain",
    value: "example.auth0.com",
    description: "Authentication domain",
    visibility: "Private",
  },
  {
    id: "2",
    name: "auth0_client_id",
    value: "client_123456",
    description: "Application client identifier",
    visibility: "Private",
  },
  {
    id: "3",
    name: "api_base_url",
    value: "https://api.example.com",
    description: "Base URL for API requests",
    visibility: "Public",
  },
  {
    id: "4",
    name: "app_environment",
    value: "development",
    description: "Current application environment",
    visibility: "Private",
  },
  {
    id: "5",
    name: "auth0_audience",
    value: "https://api.example.com",
    description: "Authentication API audience",
    visibility: "Public",
  },
  {
    id: "6",
    name: "feature_flags",
    value: "enabled",
    description: "Feature flag configuration",
    visibility: "Private",
  },
];

export const emptyForm: ParameterForm = {
  name: "",
  value: "",
  description: "",
  visibility: "Private",
};
