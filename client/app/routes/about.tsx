// app/routes/about.tsx

import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us" },
    { name: "description", content: "Learn more about us." },
  ];
}

export default function About() {
  return (
    <div>
      <h1>Chi Siamo</h1>
      <p>Questa è la pagina "Chi Siamo" dove puoi inserire informazioni sulla tua azienda.</p>
    </div>
  );
}
