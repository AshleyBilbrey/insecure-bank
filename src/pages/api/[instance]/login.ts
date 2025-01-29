import { checkPassword } from "../../../lib/account";
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
    if (!req.query.instance || !req.body || !req.body.accountId || !req.body.password) {
        return res.status(400).json({ status: "failure" });
    }
    if (typeof req.query.instance !== 'string' || typeof req.body.accountId !== 'string' || typeof req.body.password !== 'string') {
        return res.status(400).json({ status: "failure" });
    }

    let idInt = 0;
    try {
        idInt = parseInt(req.body.accountId);
    } catch {
        return res.status(400).json({ status: "failure" });
    }

    console.log("Checking user", idInt, "with password", req.body.password);
    let account = await checkPassword(req.query.instance, idInt, req.body.password);
    if (!account) {
        return res.status(400).json({ status: "failure" });
    }
    const token = jwt.sign({ accountId: account?.id, instanceId: req.query.instance }, req.query.instance);

    return res.setHeader('Set-Cookie', `session=${token}; Path=/`).status(200).json({ status: "success" });
}