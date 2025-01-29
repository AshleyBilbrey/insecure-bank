'use client'

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
    const params = useParams();
    const router = useRouter();
    const instance: string = typeof params?.instance === 'string' ? params.instance : '';

    useEffect(() => {
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        router.push(`/${instance}/`);
    }, [router, instance]);

    return null;
}
