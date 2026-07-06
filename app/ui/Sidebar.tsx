"use client";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button/Button";
import { useApi } from "../../lib/api/ApiContext";
import { UserRole } from "@/types";
import { Hardhat, Home, Paper, Papers, User, Users, Tag, Logo, CreditCard } from "./Icons";
import { bgColor4, bgColor5, buttonColor, fontColor2 } from "@/lib/constants";
import Divider from "./Divider";
import Link from "next/link";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useApi();
  const isAdmin = currentUser?.role === UserRole.Admin;

  return !currentUser ? null : (
    <div className="drawer md:drawer-open min-h-screen" style={{ background: bgColor4 }}>
      <input id="docs-sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="md:hidden fixed top-4 left-4 z-500">
          <label style={{ paddingBottom: 3 }} htmlFor="docs-sidebar" className="btn btn-circle btn-sm bg-white">
            ☰
          </label>
        </div>
        <div className="p-4 md:px-12 lg:px-24 md:py-12 py-16 max-w-4xl">
          {children}
        </div>
      </div>
      <div className="drawer-side flex z-500">
        <label
          htmlFor="docs-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <ul className="menu flex flex-col text-base-content min-h-full pb-4 px-4 z-500 bg-white shadow-xl" style={{ borderRightWidth: 1, borderColor: bgColor5 }}>
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
                  <Logo size={24} />
                </div>
                <Divider />
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
                    path={"/home"}
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
                {isAdmin && (
                  <SidebarItem
                    name={t("billing_plans")}
                    icon={() => (
                      <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <CreditCard size={18} color="black" strokeWidth={0.85} />
                      </div>
                    )}
                    path={"/billing-plans"}
                  />
                )}
              </div>
              <div className="mt-auto">
                <Button
                  variant="tertiary"
                  label={`${currentUser.last_name ?? ""} ${currentUser.first_name ?? ""}`}
                  onClick={() => {
                    const drawer = document.getElementById(
                      "docs-sidebar",
                    ) as HTMLInputElement | null;

                    if (drawer) {
                      drawer.checked = false;
                    }

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

  return (
    <>

      <li className="rounded-sm">
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
          className={`active:bg-white hover:bg-white hover:opacity-60 active:opacity-40 active:text-black gap-3`}
        >
          <Icon />
          <span>{name}</span>
        </a>
      </li>
      <Divider />
    </>
  );
};

const LinkSidebarItem = ({ name, icon, path }: SidebarItemProps) => {
  const currentPath = usePathname();
  const router = useRouter();
  const Icon = icon;
  const style = currentPath === path ? "bg-base-300 rounded-md" : "";

  return (
    <Link href={path} onClick={() => {
      const drawer = document.getElementById(
        "docs-sidebar",
      ) as HTMLInputElement | null;

      if (drawer) {
        drawer.checked = false;
      }
    }}>
      <li className={`mb-4 ${style}`}>
        <div
          className="active:bg-base-300 active:opacity-40 active:text-black gap-3"
        >
          <Icon />
          <span>{name}</span>
        </div>
      </li>
    </Link >
  );
};

export default Sidebar;
