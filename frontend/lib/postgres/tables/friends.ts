"use server"
import { db } from "../db"
export async function getFriendsFromFounder(founderId: string) {
    const res = await db.manyOrNone(`SELECT * FROM friends WHERE founder_id=$1`, [founderId])
    return res
}