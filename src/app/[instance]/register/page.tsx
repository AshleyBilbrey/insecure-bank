'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Register() {
    const params = useParams();
    const router = useRouter();
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const instance: string = typeof params?.instance === 'string' ? params?.instance : '';

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[calc(100vh-3.5rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--arasaka-red)] text-center">
                    Register
                </h1>
                <p>You made a good choice. For a limited time only, we are giving a €$1,000 bonus!</p>
                <div className='block'>
                    <label htmlFor="name" className='text-xl'>Name: </label>
                    <input value={accountName} onChange={evt => setAccountName(evt.target.value)} id="name" type='text' className='p-2 bg-[var(--background)] text-[var(--foreground)] border border-dashed border-[var(--arasaka-red)] focus:outline-none focus:ring-2 focus:ring-[var(--arasaka-red)] rounded-m' /><br />
                    <label htmlFor="password" className='text-xl'>Password: </label>
                    <input value={password} onChange={evt => setPassword(evt.target.value)} id="password" type='password' className='mt-3 p-2 bg-[var(--background)] text-[var(--foreground)] border border-dashed border-[var(--arasaka-red)] focus:outline-none focus:ring-2 focus:ring-[var(--arasaka-red)] rounded-m' /><br />
                    <button onClick={() => handleRegister(router, instance, accountName, password)} className="bg-[var(--arasaka-red)] p-4 rounded-xl hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100 mt-5">Register →</button>
                </div>
            </main>
        </div>
    );
}

async function handleRegister(router: AppRouterInstance, instanceId: string, accountName: string, password: string) {
    console.log(instanceId, accountName, password)
    const res = await fetch(`/api/${instanceId}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountName: accountName, password: password, bonus: 1000
        })
    })

    if (!res.ok) {
        console.log("There was a problem signing up for a new account.");
    }

    router.push(`/${instanceId}/account`);

}
