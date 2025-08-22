'use server';

import { generateCareTips, GenerateCareTipsInput } from '@/ai/flows/generate-care-tips';
import { z } from 'zod';

const inputSchema = z.object({
  plantName: z.string(),
  plantType: z.string(),
  environment: z.string(),
});

export async function getCareTips(input: GenerateCareTipsInput) {
  const parsedInput = inputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const output = await generateCareTips(parsedInput.data);
    return { careTips: output.careTips };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate care tips. Please try again.' };
  }
}
