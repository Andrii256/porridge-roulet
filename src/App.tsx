import { useTranslation } from "react-i18next";
import useLocalStorageState from "use-local-storage-state";
import "./app.css";
import { LanguageSwitcher } from "./components/language-switcher";
import { LS_KEYS, OPTIONS as OPTIONS_KEYS } from "./constants";
import { pickRandomItem } from "./utils/pick-random-item";

type OptionKey = (typeof OPTIONS_KEYS)[number];

function App() {
  const { t } = useTranslation();
  const [godsend, setGodSend] = useLocalStorageState<undefined | OptionKey>(
    LS_KEYS.RESULT_OF_PREV_SPIN
  );
  const [options, setOptionsToInclude] = useLocalStorageState(
    LS_KEYS.FOOD_OPTIONS,
    {
      defaultValue: OPTIONS_KEYS.map((key) => ({ key, checked: true })),
    }
  );

  const updateOptionSelection = (key: OptionKey, enforcedValue?: boolean) => {
    setOptionsToInclude((prevValue) => {
      const possibleNewValue = prevValue.map((option) =>
        option.key !== key
          ? option
          : {
              ...option,
              checked:
                typeof enforcedValue === "boolean"
                  ? enforcedValue
                  : !option.checked,
            }
      );

      if (possibleNewValue.filter((option) => option.checked).length >= 2) {
        return possibleNewValue;
      } else {
        if (typeof enforcedValue !== "boolean") {
          alert(t("minOptionsAlert"));
        }
        return prevValue;
      }
    });
  };

  const handleSpin = () => {
    const preparedOptions = options
      .filter((option) => option.checked)
      .map((option) => option.key);

    const newGodsend = pickRandomItem(preparedOptions, godsend);

    setGodSend(newGodsend);

    updateOptionSelection(newGodsend, false);
  };

  return (
    <main>
      <LanguageSwitcher />

      <ul>
        {options.map((option) => (
          <li key={option.key}>
            <label>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => updateOptionSelection(option.key)}
              />
              <span>{t(`foodOptions.${option.key}`)}</span>
            </label>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handleSpin}>
          {godsend ? t("spinAgain") : t("spin")}
        </button>
      </div>
      <div>{godsend && t(t(`foodOptions.${godsend}`))}</div>
    </main>
  );
}

export default App;
