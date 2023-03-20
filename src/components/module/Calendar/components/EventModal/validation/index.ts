import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  date: z.date().nullable(),
  guests: z.array(z.string()).min(1, { message: "Required" }),
  color: z.string(),
});

export default schema;
