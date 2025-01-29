import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";

type SeedApiResponse = { status: string };

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SeedApiResponse>
) {
    if (!process.env.SEED_PASSWORD) {
        return res.status(500).json({ status: "failure" });
    }
    if (req.method !== "POST") {
        return res.status(405).json({ status: "failure" });
    }
    if (!req.body.password || req.body.password !== process.env.SEED_PASSWORD) {
        return res.status(401).json({ status: "failure" });
    }

    const db = new sqlite3.Database('arasaka.db');

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS instances (id INTEGER PRIMARY KEY, code TEXT)", function (err) {
            if (err) {
                console.error("Error creating instances table:", err);
                return res.status(500).json({ status: "failure" });
            }
            console.log("Instances table created successfully");
        });

        db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, name TEXT, balance INTEGER, password TEXT, instanceId TEXT)", function (err) {
            if (err) {
                console.error("Error creating accounts table:", err);
                return res.status(500).json({ status: "failure" });
            }
            console.log("Accounts table created successfully");

            db.all("SELECT name FROM sqlite_master WHERE type='table'", function (err, tables) {
                if (err) {
                    console.error("Error fetching tables:", err);
                } else {
                    console.log("Tables in database:", tables);
                }
                db.close();
                res.status(200).json({ status: "success" });
            });
        });
    });
}