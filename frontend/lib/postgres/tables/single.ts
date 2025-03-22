"use server"
import { db, helpers } from "../db"


if (!helpers) {
    throw new Error("Helpers not defined")
}

const { insert, update } = helpers

const createOne = async (tableName: string, data: any) => {

    const res = await db.one(insert(data, null, tableName) + " RETURNING id")
    return res
}

const selectOne = async (tableName: string, id: string) => {
    const res = await db.oneOrNone(`SELECT * FROM ${tableName} WHERE id=$1`, [id])
    return res
}

const updateOne = async (tableName: string, id: string, data: any) => {
    const res = await db.oneOrNone(update(data, null, tableName) + "WHERE id=$1 RETURNING id", [id])
    return res
}

const deleteOne = async (tableName: string, id: string) => {
    const res = await db.oneOrNone(`DELETE FROM $1 WHERE id=$2 RETURNING id`, [tableName, id])
    return res
}

export { createOne, selectOne, updateOne, deleteOne }