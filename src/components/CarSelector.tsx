import { useEffect, useState } from "react";
import manufacturers from "../fixtures/manufacturers.json";
import models from "../fixtures/models.json";
import types from "../fixtures/types.json";
import "../styles/CarSelector.css";
import Dropdown from "./Dropdown";

type DropdownItem = { code: string; name: string };
type VehicleType = DropdownItem & { power: string; cubicCapacity: string };

const CarSelector = () => {
  const [manufacturerCode, setManufacturerCode] = useState("");
  const [modelCode, setModelCode] = useState("");
  const [typeCode, setTypeCode] = useState("");
  const [type, setType] = useState<VehicleType | null>(null);

  useEffect(() => {
    setModelCode("");
    setTypeCode("");
    setType(null);
  }, [manufacturerCode]);

  useEffect(() => {
    setTypeCode("");
    setType(null);
  }, [modelCode]);

  useEffect(() => {
    const selected = types.find((t) => t.code === typeCode) || null;
    setType(selected);
  }, [typeCode]);

  const resetSelection = () => {
    setManufacturerCode("");
    setModelCode("");
    setTypeCode("");
    setType(null);
  };

  const isOkEnabled = manufacturerCode && modelCode && typeCode;

  const getItemName = (items: DropdownItem[], code: string) =>
    items.find((i) => i.code === code)?.name || "";

  return (
    <div className="container">
      <h1 className="main-heading">Vehicle Selection</h1>
      <h2 className="sub-heading">Selection by criteria</h2>
      <div className="selection-items">
        <Dropdown
          id="manufacturer-select"
          label="Manufacturer"
          value={manufacturerCode}
          items={manufacturers}
          changeValue={setManufacturerCode}
          disabled={false}
        />
        <Dropdown
          id="model-select"
          label="Vehicle Model"
          value={modelCode}
          items={models}
          changeValue={setModelCode}
          disabled={!manufacturerCode}
        />
        <Dropdown
          id="type-select"
          label="Vehicle Type"
          value={typeCode}
          items={types}
          changeValue={setTypeCode}
          disabled={!modelCode}
        />
      </div>
      <div className="button-list">
        <button data-testid="reset-button" onClick={resetSelection}>
          RESET
        </button>
        <button
          data-testid="ok-button"
          className="button-color"
          disabled={!isOkEnabled}
        >
          OK
        </button>
      </div>

      {type && (
        <>
          <h2 className="sub-heading">Your selection</h2>
          <div className="vehicle-info">
            <p><strong>Manufacturer Name:</strong></p>
            <p>{getItemName(manufacturers, manufacturerCode)}</p>
            <p><strong>Power:</strong></p>
            <p>{type.power}</p>
            <p><strong>Model Name:</strong></p>
            <p>{getItemName(models, modelCode)}</p>
            <p><strong>Cubic Capacity:</strong></p>
            <p>{type.cubicCapacity}</p>
            <p><strong>Type:</strong></p>
            <p>{type.name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CarSelector;
