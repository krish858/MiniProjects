import { z, } from "zod";

const signinzod = z.object({
    username: z.string().email(),
    password: z.string(),
})

export default signinzod;