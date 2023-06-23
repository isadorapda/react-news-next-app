import { env } from "@/env";
import {Client} from "faunadb";

export const fauna = new Client({
    secret: env.FAUNADB_API_KEY,
})