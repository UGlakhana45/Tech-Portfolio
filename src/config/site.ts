const rawManifesto = import.meta.env.VITE_TECHNICAL_MANIFESTO_URL;
const rawResume = import.meta.env.VITE_RESUME_URL;

const DEFAULT_MANIFESTO =
  "https://docs.google.com/document/d/1Jh6ntojKi8XTz2lhYwTzEDy1fKtOGD3hgicEvUbyBdw/edit?usp=drive_link";

const DEFAULT_RESUME =
  "https://drive.google.com/file/d/1HKcYB_kgDkliGBUVPhvBP20iaIIngXS1/view?usp=drive_link";

export const TECHNICAL_MANIFESTO_URL =
  typeof rawManifesto === "string" && rawManifesto.trim().length > 0
    ? rawManifesto.trim()
    : DEFAULT_MANIFESTO;

export const RESUME_URL =
  typeof rawResume === "string" && rawResume.trim().length > 0
    ? rawResume.trim()
    : DEFAULT_RESUME;
