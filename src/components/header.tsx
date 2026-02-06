import type { ReactNode } from "react";
import { LanguageSwitcher } from "./language-switcher";

type HeaderProps = {
  leftComponent?: ReactNode;
};

export const Header = ({ leftComponent }: HeaderProps) => {
  return (
    <div className="mb-6 flex flex-row-reverse items-center gap-4 justify-between">
      {leftComponent}
      <LanguageSwitcher />
    </div>
  );
};
