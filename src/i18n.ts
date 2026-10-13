import en from './locales/en.json'
import no from './locales/no.json'
import pl from './locales/pl.json'
import es from './locales/es.json'
import de from './locales/de.json'
import it from './locales/it.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import ar from './locales/ar.json'
import sr from './locales/sr.json'
import sr_cyr from './locales/sr_cyr.json'
import ja from './locales/ja.json'
import ru from './locales/ru.json'
import se from './locales/se.json'

export const locales = {
    en,
    no,
    pl,
    es,
    de,
    it,
    pt,
    fr,
    ar,
    sr,
    sr_cyr,
    ja,
    ru,
    se,
}

export const supportedLanguages = Object.keys(locales)

export type AvailableLanguages = keyof typeof locales

/**
 * Annotated with the literal `'en'`, not `AvailableLanguages`: `en` is the source of truth that
 * every other bundle is a partial translation of, and widening it here collapses the key type in
 * `useTranslation` to the keys *every* bundle happens to share.
 */
export const defaultLanguage = 'en' as const
