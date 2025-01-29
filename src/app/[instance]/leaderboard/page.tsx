'use client'

import { TopAccounts } from '../../../lib/account';
import { LeaderbaordApiResponse } from '../../../pages/api/[instance]/leaderboard';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [accounts, setAccounts] = useState<TopAccounts>({ accounts: [{ id: 0, name: 'Loading...', balance: 0 }] });

    const params = useParams();
    const instance: string = typeof params?.instance === 'string' ? params?.instance : '';

    useEffect(() => {
        async function getLeaderboard(instance: string) {
            try {
                const res: Response = await fetch(`/api/${instance}/leaderboard`);
                if (!res.ok) {
                    throw new Error('Failed to fetch leaderboard');
                }

                const lb: LeaderbaordApiResponse = await res.json();
                setAccounts({ accounts: lb.accounts ?? [] });
            } catch {
                setAccounts({ accounts: [{ id: 0, name: 'Error', balance: 0 }] })
            }
        }

        getLeaderboard(instance);
    }, [instance]);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[calc(100vh-3.5rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--arasaka-red)] text-center">
                    Leaderboard
                </h1>
                <p>The richest of corpos.</p>
                <ol className="text-xxl list-decimal ml-4">
                    {accounts.accounts.map((u) => (
                        <li
                            key={u.id}
                            dangerouslySetInnerHTML={{
                                __html: `${u.name} - &euro;&#36;${u.balance.toLocaleString('en-US')}`,
                            }}
                        ></li>
                    ))}
                </ol>
                <Link
                    href={`/${instance}/register`}
                    className="bg-[var(--arasaka-red)] p-4 rounded-xl hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100"
                >
                    Join us. →
                </Link>
            </main>
        </div>
    );
}
