import useLocalStorageState from "use-local-storage-state";
import "./app.css";
import { OPTIONS as OPTIONS_KEYS } from "./constants";
import { pickRandomItem } from "./utils/pick-random-item";

type OptionKey = (typeof OPTIONS_KEYS)[number];

function App() {
  const [godsend, setGodSend] = useLocalStorageState<undefined | OptionKey>(
    "godsend"
  );
  const [options, setOptionsToInclude] = useLocalStorageState("options", {
    defaultValue: OPTIONS_KEYS.map((key) => ({ key, checked: true })),
  });

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
          // TODO-translate add localization here as well
          alert("There must left at least 2 options in the list.");
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
      <ul>
        {options.map((option) => (
          <li key={option.key}>
            <label>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => updateOptionSelection(option.key)}
              />
              <span>{option.key}</span>
            </label>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handleSpin}>{godsend ? "Spin Again" : "Spin"}</button>
      </div>
      <div>{godsend}</div>
    </main>
  );
}

export default App;
