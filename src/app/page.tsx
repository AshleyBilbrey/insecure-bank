'use client'

import { ProvisionApiResponse } from "../pages/api/provision";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-[family-name:var(--font-orbitron)]">Insecure Bank</h1>
        <p>A deliberately insecure bank platform to teach web security.</p>
        <p>Designed by Ashley Bilbrey.</p>
        <button onClick={() => provision(router)} className="bg-[var(--arasaka-red)] p-4 rounded-xl hover:opacity-90 focus:opacity-80 transition-all delay-50 duration-100">Provision →</button>
      </main>
    </div>
  );
}

async function provision(router: AppRouterInstance) {
  const res = await fetch('/api/provision', {
    method: "POST"
  })

  if (!res.ok) {
    console.log("There was a problem generating a provision.");
  }
  const provision: ProvisionApiResponse = await res.json();
  router.push(`/${provision.instance}`);

}