'use client'

import { AccountApiResponse } from "../../../pages/api/[instance]/account";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [getUser, setUser] = useState({ name: 'loading...', balance: 0, id: 0 });
    const [formAccountNumber, setFormAccountNumber] = useState('');
    const [formAmount, setFormAmount] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const params = useParams();
    const instance: string = typeof params?.instance === 'string' ? params?.instance : '';

    useEffect(() => {

        async function getLeaderboard(instance: string) {
            try {
                const cookieValue = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("session="))
                    ?.split("=")[1];

                const res = await fetch(`/api/${instance}/account`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        auth: cookieValue
                    })
                })

                if (!res.ok) {
                    return router.push(`/${instance}`);
                }

                const user: AccountApiResponse = await res.json();
                if (!user.name || !user.balance || !user.id) {
                    return router.push(`/${instance}`);
                }
                setUser({ name: user.name, balance: user.balance, id: user.id });
            } catch (err) {
                setUser({ name: 'Error', balance: 0, id: 0 });
                console.log(err);
                return router.push(`/${instance}`);
            }
        }

        getLeaderboard(instance);
    }, [instance]);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[calc(100vh-3.5rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--arasaka-red)] text-center">
                    Account
                </h1>
                <p>Welcome, {getUser.name}</p>
                <p>Account ID: {getUser.id}</p>
                <p>Balance: €${getUser.balance.toLocaleString('en-US')}</p>

                <div className={message ? 'hidden' : 'block'}>
                    <h2 className='text-lg'>Send Eddies</h2>
                    <label htmlFor="number" className='text-xl'>Account Id: </label>
                    <input value={formAccountNumber} onChange={evt => setFormAccountNumber(evt.target.value)} id="name" type='number' min={0} className='p-2 bg-[var(--background)] text-[var(--foreground)] border border-dashed border-[var(--arasaka-red)] focus:outline-none focus:ring-2 focus:ring-[var(--arasaka-red)] rounded-m' /><br />
                    <label htmlFor="password" className='text-xl'>Amount: </label>
                    <input value={formAmount} onChange={evt => setFormAmount(evt.target.value)} id="password" type='number' min={0} className='mt-3 p-2 bg-[var(--background)] text-[var(--foreground)] border border-dashed border-[var(--arasaka-red)] focus:outline-none focus:ring-2 focus:ring-[var(--arasaka-red)] rounded-m' /><br />
                    <button onClick={() => handleSendEddies(setMessage, instance, formAccountNumber, formAmount)} className={`bg-[var(--arasaka-red)] p-4 rounded-xl hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100 mt-5`}>Register →</button>
                </div>
                <p className={message ? '' : 'hidden'}>{message}</p>
            </main>
        </div>
    );
}

async function handleSendEddies(setMessage: React.Dispatch<React.SetStateAction<string>>, instance: string, accountNumber: string, amount: string) {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="))
        ?.split("=")[1];

    const res = await fetch(`/api/${instance}/send`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            auth: cookieValue,
            accountNumber: accountNumber,
            amount: amount
        })
    })

    const resJson = await res.json();
    if (resJson.message) {
        setMessage(resJson.message)
    } else {
        setMessage("There was an issue handling your request.")
    }

}