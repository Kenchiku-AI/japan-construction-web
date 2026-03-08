"use client";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button/Button";
import { useApi } from "../../lib/api/ApiContext";
import { UserRole } from "@/types";
import { Hardhat, Home, Paper, Papers, User, Users, Logout } from "./Icons";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { t } = useTranslation();
  const { logout } = useApi();
  const { currentUser } = useApi();

  return (
    <div className="drawer drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col md:p-16 p-8 max-w-5xl">
        {children}
      </div>
      <div className="drawer-side flex">
        <ul className="menu bg-base-200 text-base-content min-h-full p-4 justify-between">
          {currentUser && (
            <>
              <div className="space-y-2">
                <SidebarItem
                  name={t("home")}
                  icon={() => <Home size={24} />}
                  path={"/"}
                />
                <SidebarItem
                  name={t("sites")}
                  icon={() => <Hardhat size={24} />}
                  path={"/projects"}
                />
                <SidebarItem
                  name={t("reports")}
                  icon={() => <Paper size={24} />}
                  path={"/reports"}
                />
                <SidebarItem
                  name={t("report_templates")}
                  icon={() => <Papers size={24} />}
                  path={"/reports/templates"}
                />
                {currentUser.role === UserRole.Admin && (
                  <SidebarItem
                    name={t("companies")}
                    icon={() => <Users size={24} />}
                    path={"/companies"}
                  />
                )}
              </div>
              <div>
                <div className="flex gap-2 items-center max-lg:hidden mb-2">
                  <User />
                  <div>{`${currentUser.first_name} ${currentUser.last_name}`}</div>
                </div>
                <span className="min-lg:hidden">
                  <Button
                    variant="tertiary"
                    onClick={async () => {
                      await logout();
                    }}
                    iconLeft={() => <Logout />}
                    style={{ width: "100%" }}
                  />
                </span>
                <span className="max-lg:hidden">
                  <Button
                    variant="tertiary"
                    label={t("logout")}
                    onClick={async () => {
                      await logout();
                    }}
                    iconLeft={() => <Logout />}
                    style={{ width: "100%" }}
                  />
                </span>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  name: string;
  icon: FC;
  path: string;
}

const SidebarItem = ({ name, icon, path }: SidebarItemProps) => {
  const currentPath = usePathname();
  const router = useRouter();
  const Icon = icon;
  const style = currentPath === path ? "bg-base-300 rounded-md" : "";

  return (
    <li className={style}>
      <a
        onClick={() => {
          router.push(path);
        }}
        className="gap-3"
      >
        <Icon />
        <span className="max-lg:hidden">{name}</span>
      </a>
    </li>
  );
};

export default Sidebar;
