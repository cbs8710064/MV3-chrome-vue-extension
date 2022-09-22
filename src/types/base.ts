export type Nullable<T> = T | null | undefined;

export const ChromeRuntimeMessage = {
  POPUP_CLICK: 'popupClick',
  ISSUE_AUTH_TOKEN: 'issueAuthToken',
  REVOKE_AUTH_TOKEN: 'revokeAuthToken',
} as const;
