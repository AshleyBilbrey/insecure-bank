import { Account, getTopAccounts, TopAccounts } from "../../../lib/account";
import type { NextApiRequest, NextApiResponse } from "next";

export type LeaderbaordApiResponse = {
    status: string
    accounts?: Account[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LeaderbaordApiResponse>
) {
    if (req.method !== "GET") {
        return res.status(405).json({ status: "failure" });
    }
    if (!req.query.instance || !(typeof req.query.instance === 'string')) {
        return res.status(400).json({ status: "failure" });
    }

    const topAccounts: TopAccounts | undefined = await getTopAccounts(req.query.instance);
    if (!topAccounts) {
        return res.status(500).json({ status: "failure" });
    }

    return res.status(200).json({ status: "success", accounts: topAccounts.accounts });
}