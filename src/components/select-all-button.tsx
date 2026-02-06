import { type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { FoodOption, FoodOptionKey } from "../types/food-options";

type SelectDeselectAllButtonProps = {
  optionsToInclude: FoodOption[];
  setOptionsToInclude: Dispatch<
    SetStateAction<
      {
        key: FoodOptionKey;
        checked: boolean;
      }[]
    >
  >;
};

export const SelectDeselectAllButton = ({
  optionsToInclude,
  setOptionsToInclude,
}: SelectDeselectAllButtonProps) => {
  const { t } = useTranslation();

  const areAllSelected = optionsToInclude.every((option) => option.checked);

  const handleSelectAll = () => {
    setOptionsToInclude((prev) =>
      prev.map((option) => ({ ...option, checked: true })),
    );
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded text-white transition-colors ${areAllSelected ? "opacity-50 bg-gray-600 hover:bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
      onClick={handleSelectAll}
      disabled={areAllSelected}
    >
      {t("selectAll")}
    </button>
  );
};
