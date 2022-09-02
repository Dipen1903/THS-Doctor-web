import React from "react";
import { useBarcode } from "react-barcodes";

export default function Barcode({ codeString }) {
  const { inputRef } = useBarcode({
    value: codeString,
    options: {
      background: "#ffffff",
    },
  });

  return (
    <div className="barcode-sec">
      <svg ref={inputRef} />
    </div>
  );
}
