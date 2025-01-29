import { Account, getAccount } from "../../../lib/account";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export type AccountApiResponse = {
    status: string,
    id?: number
    name?: string
    balance?: number
}

export type TokenBody = {
    accountId: number,
    instanceId: string
}

interface CustomJwtPayload {
    accountId: number;
    instanceId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AccountApiResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: "failure" });
    }
    if (!req.query.instance || !req.body || !req.body.auth) {
        console.log("0")
        return res.status(400).json({ status: "failure" });
    }
    if (typeof req.query.instance !== 'string' || typeof req.body.auth !== 'string') {
        console.log("1")
        return res.status(400).json({ status: "failure" });
    }

    const decoded = jwt.decode(req.body.auth) as CustomJwtPayload;
    if (!decoded) {
        return res.status(400).json({ status: "failure" });
    }
    const account: Account | undefined = await getAccount(req.query.instance, decoded.accountId);
    console.log(account);
    if (!account) {
        console.log("2")
        return res.status(400).json({ status: "failure" });
    }

    return res.status(200).json({ status: "success", id: account.id, name: account.name, balance: account.balance });
}