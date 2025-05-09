import React, { useEffect, useState } from "react";
import manufacturers from "../fixtures/manufacturers.json";
import models from "../fixtures/models.json";
import types from "../fixtures/types.json";
import "../styles/CarSelector.css";

type VehicleType = {
  code: string;
  name: string;
  power: string;
  cubicCapacity: string;
};

const CarSelector: React.FC = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [typeCode, setTypeCode] = useState("");
  const [type, setType] = useState<VehicleType | null>(null);

  useEffect(() => {
    setModel("");
    setTypeCode("");
    setType(null);
  }, [manufacturer]);

  useEffect(() => {
    setTypeCode("");
    setType(null);
  }, [model]);

  useEffect(() => {
    const selected = types.find((t) => t.code === typeCode) || null;
    setType(selected);
  }, [typeCode]);

  const isOkEnabled = manufacturer && model && typeCode;

  return (
    <div className="vehicle-selector">
      <h1>Vehicle Selection</h1>
      <h3>Selection By Criteria</h3>
      <div className="selection-grid">
        <div className="form-section">
          <label>Manufacturer:</label>
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          >
            <option value="">-- Select Manufacturer --</option>
            {manufacturers.map((m) => (
              <option key={m.code} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Vehicle Model:</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!manufacturer}
          >
            <option value="">-- Select Model --</option>
            {models.map((m) => (
              <option key={m.code} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Vehicle Type:</label>
          <select
            value={typeCode}
            onChange={(e) => setTypeCode(e.target.value)}
            disabled={!model}
          >
            <option value="">-- Select Type --</option>
            {types.map((t) => (
              <option key={t.code} value={t.code}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <div className="form-buttons">
          <button
            onClick={() => {
              setManufacturer("");
              setModel("");
              setTypeCode("");
              setType(null);
            }}
          >
            Reset
          </button>
          <button className="button-color" disabled={!isOkEnabled}>
            OK
          </button>
        </div>
      </div>

      {type && (
        <div>
          <h3>Your Selection</h3>
          <div className="list-grid selection-grid">
            <p>
              <strong>Manufacturer Name:</strong> {manufacturer}
            </p>
            <p>
              <strong>Power:</strong> {type.power}
            </p>
            <p>
              <strong>Model Name:</strong> {model}
            </p>
            <p>
              <strong>Cubic Capacity:</strong> {type.cubicCapacity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarSelector;
