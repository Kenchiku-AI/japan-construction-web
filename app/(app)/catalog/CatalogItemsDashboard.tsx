"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Close, Plus, Search } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { CatalogItem, FormJob, UserRole } from "@/types";
import CatalogItemsList from "./CatalogItemsList";
import { redirect } from "next/navigation";
import { useCatalogItems } from "./useCatalogItems";
import DeleteCatalogItemModal from "./DeleteCatalogItemModal";
import { cardClass } from "@/lib/constants";
import CatalogItemModal from "./CatalogItemModal";
import { useFormJobs } from "../companies/[companyId]/forms/useFormJobs";
import { useIsMobile } from "@/lib/useIsMobile";
import { Input } from "@/app/ui/Input/Input";
import UploadModal from "./UploadModal";
import FormsList from "../companies/[companyId]/forms/FormsList";
import CreateUploadModal from "./CreateUploadModal";
import DeleteUploadModal from "./DeleteUploadModal";

interface CatalogItemsDashboardProps {
  companyId: string;
}

const CatalogItemsDashboard: FC<CatalogItemsDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { isMobile } = useIsMobile();
  const {
    catalogItems,
    setCatalogItems,
    getCatalogItems,
    deleteCatalogItem,
    search,
    loading: catalogItemsLoading
  } = useCatalogItems();
  const {
    formJobs,
    createFormJob,
    deleteFormJob,
    loading: formJobsLoading
  } = useFormJobs(companyId, "catalog_items");
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showCreateUpload, setShowCreateUpload] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem>();
  const [showFormJob, setShowFormJob] = useState<FormJob>();
  const [jobToDelete, setJobToDelete] = useState<FormJob>();
  const [deletingItem, setDeletingItem] = useState<CatalogItem>();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<any>(null);

  useEffect(() => {
    if (showSearch) {
      setCatalogItems([]);
      searchRef.current.value = "";
      searchRef.current.focus();
    }
  }, [showSearch]);

  if (currentUser?.role === UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <div
        className="flex gap-2"
        style={{
          paddingTop: isMobile ? 0 : 24,
          display: showSearch ? undefined : "none",
        }}
      >
        <Input
          ref={searchRef}
          placeholder={t("search_catalog_items")}
          onChange={(t) => {
            search(t);
          }}
          style={{ height: isMobile ? 36 : 38 }}
          autoFocus
          hideLabel
        />
        <div
          className="cursor-pointer"
          onClick={() => {
            getCatalogItems();
            setShowSearch(false);
          }}
        >
          <Close size={36} />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <Heading title={t("catalog_items")} />
        <div className="flex gap-5 md:gap-8">
          {!!catalogItems?.length && (
            <Button
              variant="tertiary"
              style={{ height: "auto" }}
              label={t("search")}
              iconLeft={() => <Search />}
              onClick={() => {
                setShowSearch(true);
              }}
              iconOnlyMobile
            />
          )}
          <Button
            variant="tertiary"
            style={{ height: "auto" }}
            label={t("create_item")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowCreateItem(true);
            }}
            iconOnlyMobile
          />
        </div>
      </div>
      {((catalogItems ?? []).length > 0 || !catalogItemsLoading) && (
        <div className={cardClass}>
          <CatalogItemsList
            catalogItems={catalogItems ?? []}
            isEmpty={!catalogItemsLoading && catalogItems?.length === 0}
            onEdit={(i) => setEditingItem(i)}
            onDelete={(i) => setDeletingItem(i)}
          />
        </div>
      )}
      <div className="flex justify-between mt-12">
        <div className="self-end">{t("uploads")}</div>
        <Button
          variant="tertiary"
          label={t("upload")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateUpload(true);
          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      {((formJobs ?? []).length > 0 || !formJobsLoading) && (
        <div className={cardClass}>
          <FormsList
            forms={formJobs ?? []}
            isEmpty={!formJobsLoading && formJobs?.length === 0}
            onClick={(formJob) => {
              setShowFormJob(formJob);
            }}
            isCollapsible
            hideFilename
          />
        </div>
      )}
      <CatalogItemModal
        isOpen={!!editingItem || showCreateItem}
        catalogItem={editingItem}
        onClose={() => {
          setEditingItem(undefined);
          setShowCreateItem(false);
        }}
        onSubmit={(
          code,
          name,
          nameKana,
          unit,
          supplierCode,
          supplierName
        ) => {
          if (!!editingItem) {

          } else if (showCreateItem) {

          }

          setEditingItem(undefined);
          setShowCreateItem(false);
        }}
      />
      <DeleteCatalogItemModal
        isOpen={!!deletingItem}
        onClose={() => {
          setDeletingItem(undefined);
        }}
        onDelete={() => {
          if (!deletingItem) return;

          const itemId = deletingItem.id;
          setDeletingItem(undefined);
          deleteCatalogItem(itemId);
        }}
      />
      <CreateUploadModal
        isOpen={showCreateUpload}
        onClose={() => {
          setShowCreateUpload(false);
        }}
        onSubmit={(file) => {
          createFormJob(file, file.name);
          setShowCreateUpload(false);
        }}
      />
      <UploadModal
        formJob={showFormJob}
        isOpen={!!showFormJob}
        onClose={() => {
          setShowFormJob(undefined);
        }}
        onDelete={() => {
          if (!showFormJob) return;

          setJobToDelete(showFormJob);
          setShowFormJob(undefined);
        }}
      />
      <DeleteUploadModal
        isOpen={!!jobToDelete}
        onClose={() => {
          setJobToDelete(undefined);
        }}
        onDelete={() => {
          if (!jobToDelete) return;

          deleteFormJob(jobToDelete.id);
          setJobToDelete(undefined);
        }}
      />
    </>
  );
};

export default CatalogItemsDashboard;
