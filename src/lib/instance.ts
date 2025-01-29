import sqlite3, { RunResult } from "sqlite3";
import crypto from 'crypto'
import { createAccount } from "./account";

export type Instance = {
    id: number,
    code: string,
}

export async function getInstance(instanceId: string): Promise<Instance | undefined> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('arasaka.db');
        db.get('SELECT * FROM instances WHERE code = (?)', [instanceId], (err, row: Instance | undefined) => {
            db.close();
            if (err) { reject(err) };
            resolve(row);
        })
    })
}

export async function provisionInstance(): Promise<string> {
    const randomProvision = crypto.randomBytes(16).toString('hex');

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('arasaka.db');
        db.run("INSERT INTO instances(code) VALUES(?)", [randomProvision], (_result: RunResult, err: Error) => {
            db.close();
            if (err) { reject(err) }
            console.log("Created instance with code:", randomProvision);
            createAccount(randomProvision, "Saburo Arasaka", 475000000000, crypto.randomBytes(32).toString('hex'));
            createAccount(randomProvision, "Lucas Harford", 93000000000, crypto.randomBytes(32).toString('hex'));
            createAccount(randomProvision, "The Night Estate", 5000000000, crypto.randomBytes(32).toString('hex'));
            resolve(randomProvision);
        })
    })
}