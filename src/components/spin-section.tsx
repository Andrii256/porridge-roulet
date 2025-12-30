import React from "react";
import { useTranslation } from "react-i18next";

type SpinSectionProps = {
  godsend: string | undefined;
  handleSpin: () => void;
};

export const SpinSection: React.FC<SpinSectionProps> = ({
  godsend,
  handleSpin,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-center">
      <button
        onClick={handleSpin}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      >
        {godsend ? t("spinAgain") : t("spin")}
      </button>

      {godsend && (
        <div className="text-3xl font-bold text-blue-600 bg-blue-50 py-4 rounded-xl border-2 border-dashed border-blue-200">
          {t(`foodOptions.${godsend}`)}
        </div>
      )}
    </div>
  );
};
