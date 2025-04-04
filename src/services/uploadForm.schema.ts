import { z } from "zod";

export const fileSchema = z
  .instanceof(FileList)
  .refine((files) => files.length > 0, "File is required")
  .refine((files) => !(files.length > 2), "can only upload at most 2 files")
  .refine(
    (files) => Array.from(files).every((file) => file.size < 5 * 1024 * 1024),
    "Each file must be less than 5MB"
  );

export const uploadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),

  position: z.string(),
  artifacts: fileSchema,
});

export type UploadFormSchema = z.infer<typeof uploadFormSchema>;
