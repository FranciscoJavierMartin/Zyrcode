import * as locales from '../src/i18n/locales';

type BasicLocale = Record<string, string>;
type Locale = Record<string, string | BasicLocale>;
type LocaleKeys = Record<string, Set<string>>;

const languales = Object.keys(locales);

/**
 * Get the translation keys from a given locale.
 *
 * @param {Locale} locale - The locale object to get keys from.
 * @returns {string[]} An array of translation keys for the given locale.
 */
function getKeysFromLocale(locale: Locale): string[] {
  return Object.entries(locale)
    .filter(([key]) => !!key)
    .map(([key, value]) =>
      typeof value === 'string'
        ? key
        : getKeysFromLocale(value).map((newValue) => `${key}.${newValue}`),
    )
    .flat();
}

/**
 * Generates a cross product of keys from an array, excluding pairs with duplicate keys.
 *
 * @param {string[]} keys - An array of string keys.
 * @returns {string[][]} - A two-dimensional array representing the cross product of the keys, excluding duplicates.
 */
function crossProductWithoutDuplicates(keys: string[]): string[][] {
  return keys
    .reduce<
      string[][]
    >((acc, key) => [...acc, ...keys.map((anotherKey) => [key, anotherKey])], [])
    .filter(([key1, key2]) => key1 !== key2);
}

const localesSet: LocaleKeys = Object.entries(locales).reduce<LocaleKeys>(
  (acc, [localeKey, locale]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acc[localeKey] = new Set(getKeysFromLocale(locale as any));
    return acc;
  },
  {},
);

const missingKeys = crossProductWithoutDuplicates(languales)
  .map<[string, Set<string>]>(([locale1, locale2]) => {
    const set1 = localesSet[locale1];
    const set2 = localesSet[locale2];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [`${locale1} - ${locale2}`, (set1 as any).difference(set2)];
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .filter(([_, difference]) => difference.size > 0);

if (missingKeys.length > 0) {
  const formattedText = missingKeys
    .map(([locale, difference]) => {
      let res: string = '';

      for (const key of difference.keys()) {
        res += `\t${key}\n`;
      }

      return `${locale}:\n ${res}`;
    })
    .join('\n');

  console.error('Missing keys');
  console.info(formattedText);
  process.exit(1);
}
