'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Login() {
    const params = useParams();
    const router = useRouter();
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const instance: string = typeof params?.instance === 'string' ? params?.instance : '';

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[calc(100vh-3.5rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--arasaka-red)] text-center">
                    Login
                </h1>
                <p>Welcome back. In megacorp we trust.</p>
                <div className={message ? 'hidden' : 'block'}>
                    <label htmlFor="id" className='text-xl'>Account ID: </label>
                    <input value={id} onChange={evt => setId(evt.target.value)} id="id" type='text' className='p-2 bg-[var(--background)] text-[var(--foreground)] border border-dashed border-[var(--arasaka-red)] focus:outline-none focus:ring-2 focus:ring-[var(--arasaka-red)] rounded-m' /><br />
                    <label htmlFor="password" className='text-xl'>Password: </label>
                    <input value={password} onChange={evt => setPassword(evt.target.value)} id="password" type='password' className='mt-3 p-2 bg-[var(--background)] text-[var(--foreground)] border border-dashed border-[var(--arasaka-red)] focus:outline-none focus:ring-2 focus:ring-[var(--arasaka-red)] rounded-m' /><br />
                    <button onClick={() => handleLogin(setMessage, router, instance, id, password)} className="bg-[var(--arasaka-red)] p-4 rounded-xl hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100 mt-5">Register →</button>
                </div>
                <p className={message ? 'block' : 'hidden'}>{message}</p>
            </main>
        </div>
    );
}

async function handleLogin(setMessage: React.Dispatch<React.SetStateAction<string>>, router: AppRouterInstance, instanceId: string, accountId: string, password: string) {
    console.log(instanceId, accountId, password)
    const res = await fetch(`/api/${instanceId}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountId: accountId, password: password
        })
    })

    if (!res.ok) {
        setMessage("There was a problem logging you in. Please refresh and ensure you have the correct account ID and password.");
        return;
    }

    router.push(`/${instanceId}/account`);

}
