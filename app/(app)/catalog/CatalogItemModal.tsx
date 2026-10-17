import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { CatalogItem } from "@/types/catalog";

interface CatalogItemModalProps {
  isOpen: boolean;
  catalogItem?: CatalogItem;
  onClose: () => void;
  onSubmit: (
    code: string,
    name: string,
    nameKana: string,
    unit: string,
    supplierCode: string,
    supplierName: string,
    listPrice: number,
    unitCost: number,
    sourceUpdatedAt: string,
  ) => void;
}

const CatalogItemModal: FC<CatalogItemModalProps> = ({
  isOpen,
  catalogItem,
  onClose,
  onSubmit,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [nameKana, setNameKana] = useState("");
  const [unit, setUnit] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [listPrice, setListPrice] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [sourceUpdatedAt, setSourceUpdatedAt] = useState("");

  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setCode("");
      setName("");
      setNameKana("");
      setUnit("");
      setSupplierCode("");
      setSupplierName("");
      setListPrice(0);
      setUnitCost(0);
      setSourceUpdatedAt("");
    }, 500);
  };

  useEffect(() => {
    if (!catalogItem) return;

    setCode(catalogItem.code);
    setName(catalogItem.name);
    setNameKana(catalogItem.name_kana);
    setUnit(catalogItem.unit ?? "");
    setSupplierCode(catalogItem.supplier_code ?? "");
    setSupplierName(catalogItem.supplier_name ?? "");
    setListPrice(catalogItem.list_price ?? 0);
    setUnitCost(catalogItem.unit_cost ?? 0);
    setSourceUpdatedAt(catalogItem.source_updated_at ?? "");
  }, [catalogItem]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t(catalogItem ? "update_item" : "create_item")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("name")} onChange={setName} />
      </div>
      <Button
        disabled={!name || !nameKana || !code}
        label={t(catalogItem ? "update" : "create")}
        onClick={() => {
          onSubmit(
            code,
            name,
            nameKana,
            unit,
            supplierCode,
            supplierName,
            listPrice,
            unitCost,
            sourceUpdatedAt,
          );
          reset();
        }}
      />
    </Modal>
  );
};

export default CatalogItemModal;
