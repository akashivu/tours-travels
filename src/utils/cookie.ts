export const COOKIE_EVENT = "open-cookie-preferences";

export const COOKIE_STORAGE_KEY = "cookie_preferences_v1";

export const openCookiePreferences = () => {
  window.dispatchEvent(new Event(COOKIE_EVENT));
};