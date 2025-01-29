import { createAccount } from "../../../lib/account";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

type RegisterApiResponse = {
    status: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterApiResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: "failure" });
    }
    if (!req.query.instance || !req.body || !req.body.accountName || !req.body.password || !req.body.bonus) {
        return res.status(400).json({ status: "failure" });
    }
    if (typeof req.query.instance !== 'string' || typeof req.body.accountName !== 'string' || typeof req.body.password !== 'string' || typeof req.body.bonus !== 'number') {
        return res.status(400).json({ status: "failure" });
    }

    let account = await createAccount(req.query.instance, req.body.accountName, req.body.bonus, req.body.password);
    const token = jwt.sign({ accountId: account?.id, instanceId: req.query.instance }, req.query.instance);

    return res.setHeader('Set-Cookie', `session=${token}; Path=/`).status(200).json({ status: "success" });
}