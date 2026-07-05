"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { CreditCard, Edit, Plus, Trash } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import Divider from "@/app/ui/Divider";
import { cardClass, fontColor1, fontColor2 } from "@/lib/constants";
import { Loader } from "@/app/ui/Loader";
import { useBillingPlans } from "./useBillingPlans";
import { BillingPlan } from "@/types/billingPlans";
import { Button } from "@/app/ui/Button/Button";
import CreateBillingPlanModal from "./CreateBillingPlanModal";
import DeleteBillingPlanModal from "./DeleteBillingPlanModal";
import EditBillingPlanModal from "./EditBillingPlanModal";

const BillingPlansPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useApi();
  const { billingPlans, createBillingPlan, updateBillingPlan, deleteBillingPlan } = useBillingPlans();
  const [showCreateBillingPlan, setShowCreateBillingPlan] = useState(false);
  const [editBillingPlan, setEditBillingPlan] = useState<BillingPlan | undefined>();
  const [deleteBillingPlanId, setDeleteBillingPlanId] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role !== UserRole.Admin) {
      router.push("/home");
    }
  }, [currentUser]);

  return !currentUser || currentUser.role !== UserRole.Admin ? null : (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("billing_plans")} />
        <Button
          variant="tertiary"
          style={{ height: "auto" }}
          label={t("create_billing_plan")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateBillingPlan(true);
          }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        {billingPlans?.length === 0 && (
          <div className={styles.empty}>{t("empty_billing_plans_description")}</div>
        )}
        {billingPlans?.map((b, i) => (
          <div key={b.id}>
            {i > 0 && <Divider />}
            <div className="md:mx-3">
              <div className="flex items-center justify-between">
                <div
                  style={{ height: 60, minWidth: 0 }}
                  className="flex items-center gap-3"
                >
                  <div>
                    <CreditCard color={fontColor1} strokeWidth={1} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: fontColor1 }}>{b.name}<span className="ml-2">{`(¥${b.amount_jpy}/${t("month")})`}</span></div>
                    <div className={styles.subtitle}>{b.description}</div>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-5 items-center">
                  <div
                    className="cursor-pointer pb-1"
                    onClick={() => setEditBillingPlan(b)}
                  >
                    <Edit />
                  </div>
                  <div className="cursor-pointer" onClick={() => setDeleteBillingPlanId(b.id)}>
                    <Trash />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CreateBillingPlanModal
        isOpen={showCreateBillingPlan}
        onClose={() => {
          setShowCreateBillingPlan(false);
        }}
        onSubmit={(request) => {
          setShowCreateBillingPlan(false);
          createBillingPlan(request);
        }}
      />
      <CreateBillingPlanModal
        isOpen={showCreateBillingPlan}
        onClose={() => {
          setShowCreateBillingPlan(false);
        }}
        onSubmit={(request) => {
          setShowCreateBillingPlan(false);
          createBillingPlan(request);
        }}
      />
      <EditBillingPlanModal
        isOpen={!!editBillingPlan}
        billingPlan={editBillingPlan}
        onClose={() => {
          setEditBillingPlan(undefined);
        }}
        onSubmit={(request) => {
          if (!editBillingPlan) return;

          updateBillingPlan(editBillingPlan.id, request);
          setEditBillingPlan(undefined);
        }}
      />
      <DeleteBillingPlanModal
        isOpen={!!deleteBillingPlanId}
        onClose={() => setDeleteBillingPlanId("")}
        onDelete={() => {
          deleteBillingPlan(deleteBillingPlanId);
          setDeleteBillingPlanId("");
        }}
      />
      {showLoader && <Loader />}
    </>
  );
};

export default BillingPlansPage;
