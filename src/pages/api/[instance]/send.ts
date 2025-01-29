import { Account, getAccount, updateBalance } from "../../../lib/account";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

type SendApiResponse = {
    status: string,
    message: string
}

interface CustomJwtPayload {
    accountId: number;
    instanceId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SendApiResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: "failure", message: "Bad Request" });
    }
    if (!req.query.instance || !req.body || !req.body.auth || !req.body.accountNumber || !req.body.amount) {
        return res.status(400).json({ status: "failure", message: "Bad Request" });
    }
    if (typeof req.query.instance !== 'string' || typeof req.body.accountNumber !== 'string' || typeof req.body.amount !== 'string') {
        return res.status(400).json({ status: "failure", message: "Bad Request" });
    }

    let receiverInt = 0;
    let sendAmountInt = 0;
    try {
        receiverInt = parseInt(req.body.accountNumber);
        sendAmountInt = parseInt(req.body.amount);
    } catch {
        return res.status(400).json({ status: "failure", message: "Bad Request" });
    }

    if (sendAmountInt < 1) {
        return res.status(400).json({ status: "failure", message: "You must send at least one eurodollar." });
    }

    const decoded = jwt.decode(req.body.auth) as CustomJwtPayload;
    if (!decoded) {
        return res.status(400).json({ status: "failure", message: "Bad Request" });
    }
    const senderAccount: Account | undefined = await getAccount(req.query.instance, decoded.accountId);

    if (!senderAccount) {
        return res.status(400).json({ status: "failure", message: "Bad Request" });
    }

    if (sendAmountInt > senderAccount.balance) {
        return res.status(400).json({ status: "failure", message: "You can't overdraft your account." });
    }

    const receiverAccount: Account | undefined = await getAccount(req.query.instance, parseInt(req.body.accountNumber));

    if (!receiverAccount) {
        return res.status(400).json({ status: "failure", message: "That account does not exist!" });
    }

    await updateBalance(req.query.instance, decoded.accountId, senderAccount.balance - sendAmountInt);
    await updateBalance(req.query.instance, receiverInt, receiverAccount.balance + sendAmountInt);

    return res.status(200).json({ status: "success", message: `You successfully sent €$${sendAmountInt.toLocaleString('en-US')} to account #${req.body.accountNumber}` });
}