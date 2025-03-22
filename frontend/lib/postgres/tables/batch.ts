"use server"
import { db, helpers } from "../db"

const insert = helpers?.insert
const batchCreate = async (data: any[], tableName: string, userId: string) => {

    if (!insert) {
        throw new Error("insert helper from pg-promise not defined");
    }

    if (data.length === 0) return;

    const fullData = data.map(d => {
        return {
            ...data,
            organization_id: userId,
            created_by: userId,
        }
    })
    try {
        const res = await db.task("insert multiple records", t => {
            const queries = fullData.map(d => {
                return t.one(insert(d, null, tableName) + " RETURNING id");
            })
            return t.batch(queries)
        })
        return res
    } catch (e: any) {
        console.error(e);
        throw new Error(JSON.stringify(e.getErrors?.() || e.message));
    }
};


const batchDelete = async (ids: string[], tableName: string, userId: string) => {
    if (ids.length === 0) return;

    await db.none(
        `DELETE FROM $1 WHERE id = ANY($2) AND organization_id=$3`,
        [tableName, ids, userId]
    );
};

const batchSelect = async (ids: string[], tableName: string, userId: string) => {

    if (ids.length === 0) return [];

    return await db.any(
        `SELECT * FROM ${tableName} WHERE id = ANY($1) AND organization_id = $2`,
        [ids, userId]
    );
};

const selectAll = async (tableName: string, userId: string) => {
    if (!userId) {
        throw new Error("Unauthorized: No organization found");
    }
    const res = await db.any(`SELECT * FROM ${tableName} WHERE created_by=$1`, [userId]);
    return res
};


export { batchCreate, batchDelete, batchSelect, selectAll }