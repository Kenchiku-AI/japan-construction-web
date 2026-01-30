"use client";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { Button } from "./Button/Button";
import { useAuth } from "@/lib/context/auth/useAuth";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-16">{children}</div>
      <div className="drawer-side flex">
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4 justify-between">
          <div className="space-y-2">
            <SidebarItem name={t("home")} path={"/"} />
            <SidebarItem name={t("companies")} path={"/companies"} />
          </div>
          <div>
            <Button
              variant="tertiary"
              label={t("logout")}
              onClick={() => {
                logout();
              }}
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  name: string;
  path: string;
}

const SidebarItem = ({ name, path }: SidebarItemProps) => {
  const currentPath = usePathname();
  const style = currentPath === path ? "bg-base-300 rounded-md" : "";

  return (
    <li className={style}>
      <a href={path}>{name}</a>
    </li>
  );
};

export default Sidebar;
