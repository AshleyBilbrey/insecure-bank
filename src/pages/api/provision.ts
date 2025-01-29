import { provisionInstance } from "../../lib/instance";
import type { NextApiRequest, NextApiResponse } from "next";

export type ProvisionApiResponse = {
    status: string
    instance?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProvisionApiResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: "failure" });
    }

    const provisionId = await provisionInstance();

    return res.status(200).json({ status: "success", instance: provisionId });
}