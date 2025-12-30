import React from "react";
import { useTranslation } from "react-i18next";
import type { FoodOption, FoodOptionKey } from "../types/food-options";

type OptionsListProps = {
  options: FoodOption[];
  updateOptionSelection: (key: FoodOptionKey) => void;
};

export const OptionsList: React.FC<OptionsListProps> = ({
  options,
  updateOptionSelection,
}) => {
  const { t } = useTranslation();
  return (
    <ul className="space-y-2 mb-8">
      {options.map((option) => (
        <li key={option.key}>
          <label
            className={`flex items-center p-3 rounded-xl border transition-colors cursor-pointer group ${
              option.checked
                ? "border-blue-100 bg-blue-50"
                : "border-gray-100 bg-white hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={option.checked}
              onChange={() => updateOptionSelection(option.key)}
            />
            <span
              className={`ml-3 text-gray-700 ${
                option.checked ? "font-medium" : "group-hover:text-gray-900"
              }`}
            >
              {t(`foodOptions.${option.key}`)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};
