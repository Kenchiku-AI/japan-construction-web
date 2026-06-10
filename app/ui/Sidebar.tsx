"use client";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button/Button";
import { useApi } from "../../lib/api/ApiContext";
import { UserRole } from "@/types";
import { Hardhat, Home, Paper, Papers, User, Users, Tag, Logo } from "./Icons";
import { buttonColor, fontColor2 } from "@/lib/constants";
import Divider from "./Divider";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useApi();
  const isAdmin = currentUser?.role === UserRole.Admin;

  return !currentUser ? null : (
    <div className="drawer md:drawer-open">
      <input id="docs-sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="md:hidden fixed top-4 left-4 z-5">
          <label htmlFor="docs-sidebar" className="btn btn-circle btn-sm">
            ☰
          </label>
        </div>
        <div className="p-4 md:px-12 lg:px-24 md:py-12 py-16 max-w-4xl">
          {children}
        </div>
      </div>
      <div className="drawer-side flex z-100">
        <label
          htmlFor="docs-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <ul className="menu flex flex-col bg-base-200 text-base-content min-h-full pb-4 px-4 z-100">
          <div
            className="md:hidden flex justify-end"
            style={{ marginRight: -6 }}
          >
            <label htmlFor="docs-sidebar" className="btn btn-circle btn-sm">
              ✕
            </label>
          </div>

          {currentUser && (
            <div className="flex flex-col flex-1">
              <div className="space-y-2">
                <div className="flex justify-center pb-2 md:pt-3">
                  <Logo size={24} color={fontColor2} />
                </div>
                <Divider
                  style={{ opacity: 0.1, marginBottom: 18, marginTop: 0 }}
                />
                {isAdmin && (
                  <SidebarItem
                    name={t("companies")}
                    icon={() => <Users size={24} />}
                    path={"/companies"}
                  />
                )}
                {!!currentUser.company && (
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
                {currentUser.role === "manager" && (
                  <>
                    <SidebarItem
                      name={t("report_templates")}
                      icon={() => <Papers size={24} />}
                      path={"/reports/templates"}
                    />
                    <SidebarItem
                      name={t("tags")}
                      icon={() => <Tag size={22} />}
                      path={"/tags"}
                    />
                  </>
                )}
              </div>
              <div className="mt-auto">
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
              </div>
            </div>
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
          const drawer = document.getElementById(
            "docs-sidebar",
          ) as HTMLInputElement | null;

          if (drawer) {
            drawer.checked = false;
          }

          router.push(path);
        }}
        className={`active:bg-base-300 active:opacity-40 active:text-black gap-3`}
      >
        <Icon />
        <span>{name}</span>
      </a>
    </li>
  );
};

export default Sidebar;
