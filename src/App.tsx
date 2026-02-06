import { useTranslation } from "react-i18next";
import useLocalStorageState from "use-local-storage-state";
import "./app.css";

import { Header } from "./components/header";
import { OptionsList } from "./components/options-list";
import { SpinSection } from "./components/spin-section";
import { FOOD_OPTIONS_KEYS, LS_KEYS } from "./constants";
import type { FoodOptionKey } from "./types/food-options";
import { pickRandomItem } from "./utils/pick-random-item";
import { SelectDeselectAllButton } from "./components/select-all-button";

function App() {
  const { t } = useTranslation();
  const [godsend, setGodSend] = useLocalStorageState<undefined | FoodOptionKey>(
    LS_KEYS.RESULT_OF_PREV_SPIN,
  );
  const [optionsToInclude, setOptionsToInclude] = useLocalStorageState(
    LS_KEYS.FOOD_OPTIONS,
    {
      defaultValue: FOOD_OPTIONS_KEYS.map((key) => ({ key, checked: true })),
    },
  );

  const updateOptionSelection = (
    key: FoodOptionKey,
    enforcedValue?: boolean,
  ) => {
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
            },
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
    const preparedOptions = optionsToInclude
      .filter((option) => option.checked)
      .map((option) => option.key);

    const newGodsend = pickRandomItem(preparedOptions, godsend);
    setGodSend(newGodsend);
    updateOptionSelection(newGodsend, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-900">
      <main className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <Header
          leftComponent={
            <SelectDeselectAllButton
              optionsToInclude={optionsToInclude}
              setOptionsToInclude={setOptionsToInclude}
            />
          }
        />

        <OptionsList
          options={optionsToInclude}
          updateOptionSelection={updateOptionSelection}
        />

        <SpinSection godsend={godsend} handleSpin={handleSpin} />
      </main>
    </div>
  );
}

export default App;
