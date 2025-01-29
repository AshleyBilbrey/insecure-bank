import Link from 'next/link';

export default async function InstanceHome({
    params,
}: {
    params: Promise<{ instance: string }>
}) {
    const instance = (await params).instance;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[calc(100vh-3.5rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <img src="/images/arakasakawordmark.png" alt="Arasaka" className="w-1/2 text-center" />
                <h1 className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--arasaka-red)] text-center">Financial Services</h1>
                <p>Your eurodollars are safe with us.™</p>
                <Link href={`/${instance}/register`} className="bg-[var(--arasaka-red)] p-4 rounded-xl hover:opacity-80 focus:opacity-80 transition-all delay-50 duration-100">Open An Account →</Link>
            </main>
        </div >
    );
}
