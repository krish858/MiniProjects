import { z, } from "zod";

const signupzod = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string(),
})

export default signupzod;
