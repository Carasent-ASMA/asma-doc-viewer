import { useCallback, useContext } from "react";
import mustache from "mustache";
import { DocViewerContext } from "../store/DocViewerProvider";
import { defaultLanguage, locales } from "../i18n";

export const useTranslation = () => {
  const {
    state: { language },
  } = useContext(DocViewerContext);

  const defaultTranslations = locales[defaultLanguage];

  const t = useCallback(
    (
      key: keyof typeof defaultTranslations,
      variables?: Record<string, string | number>,
    ) => {
      // A bundle other than `en` may be missing a key — that is the case this function already
      // handled at runtime, now stated in the type instead of being hidden by a widened union.
      const translations: Partial<typeof defaultTranslations> = locales[language];

      const localized = translations[key];
      if (localized) {
        return mustache.render(localized, variables);
      }

      const fallback = defaultTranslations[key];
      if (fallback) {
        return mustache.render(fallback, variables);
      }

      return key;
    },
    [language, defaultTranslations],
  );

  return {
    t,
  };
};
