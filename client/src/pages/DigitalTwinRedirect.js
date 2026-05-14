import { useEffect } from "react";

const DIGITAL_TWIN_URL = "https://tnc-digital-twin.vercel.app/?v2";

export default function DigitalTwinRedirect() {
  useEffect(() => {
    window.location.replace(DIGITAL_TWIN_URL);
  }, []);

  return null;
}
