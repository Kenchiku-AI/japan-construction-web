"use client";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button/Button";
import { useApi } from "../../lib/api/ApiContext";
import { UserRole } from "@/types";
import {
  Hardhat,
  Home,
  Paper,
  Papers,
  User,
  Users,
  Logout,
  Tag,
  Logo,
} from "./Icons";
import { buttonColor, fontColor2 } from "@/lib/constants";
import Divider from "./Divider";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useApi();
  const isAdmin = currentUser?.role === UserRole.Admin;

  return !currentUser ? null : (
    <div className="drawer drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4 md:px-24 md:py-12 max-w-4xl">
        {children}
      </div>
      <div className="drawer-side flex">
        <ul className="menu bg-base-200 lg:w-48 min-w-14 md:min-w-20 text-base-content min-h-full pb-4 md:px-4 px-1 justify-between">
          {currentUser && (
            <>
              <div className="space-y-2">
                <div className="flex justify-center py-2">
                  <Logo size={26} color={fontColor2} />
                </div>
                <Divider
                  style={{ opacity: 0.1, marginBottom: 18, marginTop: 0 }}
                />
                {isAdmin ? (
                  <SidebarItem
                    name={t("companies")}
                    icon={() => <Users size={24} />}
                    path={"/companies"}
                  />
                ) : (
                  <SidebarItem
                    name={t("home")}
                    icon={() => <Home size={24} />}
                    path={"/"}
                  />
                )}
                <SidebarItem
                  name={t("projects")}
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
                {!isAdmin && (
                  <SidebarItem
                    name={t("tags")}
                    icon={() => <Tag size={22} />}
                    path={"/tags"}
                  />
                )}
              </div>
              <div>
                <span className="min-lg:hidden">
                  <Button
                    variant="tertiary"
                    onClick={() => {
                      router.push(`/users/${currentUser.id}`);
                    }}
                    iconLeft={() => <User color={buttonColor} size={30} />}
                    style={{ width: "100%" }}
                  />
                </span>
                <span className="max-lg:hidden">
                  <Button
                    variant="tertiary"
                    label={`${currentUser.last_name ?? ""} ${currentUser.first_name ?? ""}`}
                    onClick={() => {
                      router.push(`/users/${currentUser.id}`);
                    }}
                    iconLeft={() => <User color={buttonColor} size={28} />}
                    textStyle={{
                      fontWeight: "normal",
                      fontSize: 14,
                      textAlign: "left",
                    }}
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
    <li className={`mb-4 ${style}`}>
      <a
        onClick={() => {
          router.push(path);
        }}
        className={`active:bg-base-300 active:opacity-40 active:text-black gap-3`}
      >
        <Icon />
        <span className="max-lg:hidden">{name}</span>
      </a>
    </li>
  );
};

export default Sidebar;
