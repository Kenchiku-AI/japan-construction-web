"use client";

import React, { FC, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Divider from "../ui/Divider";
import { fontColor2 } from "@/lib/constants";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <div className="drawer md:drawer-open">
      <input id="docs-sidebar" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="md:hidden fixed top-4 left-4 z-5">
          <label style={{ paddingBottom: 3 }} htmlFor="docs-sidebar" className="btn btn-circle btn-sm">
            ☰
          </label>
        </div>

        <div className="flex justify-center p-4 md:px-12 lg:px-24 md:py-12 py-16">
          {children}
        </div>
      </div>

      <div className="drawer-side flex">
        <label
          htmlFor="docs-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <ul className="menu bg-base-200 text-base-content min-h-full pb-8 md:pt-4 px-4">
          <div
            className="md:hidden flex justify-end"
            style={{ marginRight: -6 }}
          >
            <label htmlFor="docs-sidebar" className="btn btn-circle btn-sm">
              ✕
            </label>
          </div>
          <div style={{ color: fontColor2 }}>{"ご利用ガイド"}</div>
          <Divider />
          <div className="space-y-1">
            <SidebarItem name="クイックスタート" path="/docs/quick-start" />
            <SidebarItem name="LINE連携" path="/docs/line-setup" />
            <SidebarItem name="LINEトーク" path="/docs/line-conversations" />
            <SidebarItem name="プロジェクト" path="/docs/projects" />
            <SidebarItem name="テンプレート" path="/docs/templates" />
            <SidebarItem name="報告書" path="/docs/reports" />
            <SidebarItem name="写真とタグ" path="/docs/photos-and-tags" />
            <SidebarItem name="ダウンロード" path="/docs/exports" />
            <SidebarItem name="ゲスト" path="/docs/guests" />
            <SidebarItem name="管理者向け" path="/docs/admin" />
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
  const router = useRouter();

  const active = currentPath === path || currentPath.startsWith(`${path}/`);

  return (
    <li className={`mb-1 ${active ? "bg-base-300 rounded-md" : ""}`}>
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
        className="active:bg-base-300 active:opacity-40 active:text-black gap-3"
      >
        <span className="max-md:text-sm">{name}</span>
      </a>
    </li>
  );
};

export default Sidebar;
