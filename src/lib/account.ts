import { getInstance } from "./instance"
import sqlite3 from "sqlite3";

export type Account = {
    id: number
    name: string,
    balance: number
}

export type TopAccounts = {
    accounts: Account[]
}

export async function getAccount(instanceId: string, id: number): Promise<Account | undefined> {
    const instance = await getInstance(instanceId);
    if (!instance) { console.log("NO INSTANCE"); return undefined; }

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('db/arasaka.db');
        db.get('SELECT * FROM accounts WHERE instanceId = (?) AND id = (?)', [instanceId, id], (err, row: Account | undefined) => {
            db.close();
            if (err) {
                reject(err);
                return;
            }
            if (row) {
                resolve({ id: row.id, name: row.name, balance: row.balance });
            } else {
                console.log("NO ROW");
                resolve(undefined);
            }
        });
    });
}



export async function createAccount(instanceId: string, name: string, startingBalance: number, password: string): Promise<Account | undefined> {
    const instance = await getInstance(instanceId);
    if (!instance) return;

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database("arasaka.db");

        db.run(
            "INSERT INTO accounts(name, balance, password, instanceId) VALUES(?, ?, ?, ?)",
            [name, startingBalance, password, instanceId],
            function (err) {
                db.close();

                if (err) {
                    console.error("Error inserting account:", err);
                    return reject(err);
                }

                console.log("Account created with ID:", this.lastID);
                resolve({ id: this.lastID, name, balance: startingBalance });
            }
        );
    });
}

export async function getTopAccounts(instanceId: string): Promise<TopAccounts | undefined> {
    const instance = await getInstance(instanceId);
    if (!instance) { return }

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('db/arasaka.db');
        db.all('SELECT * FROM accounts WHERE instanceId = (?) ORDER BY balance DESC LIMIT 10', [instanceId], (err, rows: Account[] | undefined) => {
            db.close();
            if (err) { reject(err) };
            if (rows) {
                resolve({ accounts: rows.map((row) => { return { id: row.id, name: row.name, balance: row.balance } }) })
            } else {
                resolve(undefined);
            }
        })
    })
}

export async function checkPassword(instanceId: string, id: number, password: string): Promise<Account | undefined> {
    const instance = await getInstance(instanceId);
    if (!instance) { console.log("NO INSTANCE"); return undefined; }

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('db/arasaka.db');
        db.get('SELECT * FROM accounts WHERE instanceId = (?) AND id = (?) AND password = (?)', [instanceId, id, password], (err, row: Account | undefined) => {
            db.close();
            if (err) {
                reject(err);
                return;
            }
            if (row) {
                resolve({ id: row.id, name: row.name, balance: row.balance });
            } else {
                console.log("NO ROW");
                resolve(undefined);
            }
        });
    });
}


export async function updateBalance(instanceId: string, id: number, newBalance: number): Promise<void> {
    const instance = await getInstance(instanceId);
    if (!instance) return;

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database("arasaka.db");

        db.run(
            "UPDATE accounts SET balance = (?) WHERE id = (?) AND instanceId = (?)",
            [newBalance, id, instanceId],
            function (err) {
                db.close();

                if (err) {
                    console.error("Error inserting account:", err);
                    return reject(err);
                }

                console.log("Account updated with ID:", this.lastID);
                resolve();
            }
        );
    });
}