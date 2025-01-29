'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
    instance: string;
}

export default function Header(props: HeaderProps) {
    const [cookieValue, setCookieValue] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const getSessionCookie = () => {
            const sessionCookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("session="))
                ?.split("=")[1] || null;
            setCookieValue(sessionCookie);
        };

        getSessionCookie();
    }, [pathname]);

    return (
        <header className="w-full h-14 flex flex-row text-lg font-[family-name:var(--font-orbitron)] text-[var(--arasaka-red)]">
            <a href={`/${props.instance}`} className="flex flex-row items-center hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100">
                <img src="/images/arasakasquare.png" alt="Arasaka" className="h-12 m-2" />
                <span>Financial</span>
            </a>
            <div className="ml-auto flex flex-row items-center h-14">
                <a href={`/${props.instance}/${cookieValue ? 'account' : 'register'}`} className="ml-2 mr-2 hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100">{cookieValue ? 'Account' : 'Open an Account'}</a>
                <a href={`/${props.instance}/leaderboard`} className="ml-2 mr-2 hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100">Leaderboard</a>
                <a href={`/${props.instance}/${cookieValue ? 'logout' : 'login'}`} className="ml-2 mr-2 hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100">
                    {cookieValue ? 'Logout' : 'Login'}
                </a>
            </div>
        </header>
    );
}
