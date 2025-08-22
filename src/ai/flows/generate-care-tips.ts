'use server';

/**
 * @fileOverview A plant care tip generation AI agent.
 *
 * - generateCareTips - A function that handles the plant care tip generation process.
 * - GenerateCareTipsInput - The input type for the generateCareTips function.
 * - GenerateCareTipsOutput - The return type for the generateCareTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareTipsInputSchema = z.object({
  plantName: z.string().describe('The name of the plant to generate care tips for.'),
  plantType: z.string().describe('The type of the plant (e.g., tree, shrub, flower).'),
  environment: z.string().optional().describe('The environment where the plant will be grown (e.g., indoor, outdoor).'),
});
export type GenerateCareTipsInput = z.infer<typeof GenerateCareTipsInputSchema>;

const GenerateCareTipsOutputSchema = z.object({
  careTips: z.string().describe('AI-generated care tips for the specified plant.'),
});
export type GenerateCareTipsOutput = z.infer<typeof GenerateCareTipsOutputSchema>;

export async function generateCareTips(input: GenerateCareTipsInput): Promise<GenerateCareTipsOutput> {
  return generateCareTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareTipsPrompt',
  input: {schema: GenerateCareTipsInputSchema},
  output: {schema: GenerateCareTipsOutputSchema},
  prompt: `You are an expert horticulturist. Generate comprehensive care tips for the following plant, taking into account its type and the environment it will be grown in.

Plant Name: {{{plantName}}}
Plant Type: {{{plantType}}}
Environment: {{{environment}}}

Care Tips:`,
});

const generateCareTipsFlow = ai.defineFlow(
  {
    name: 'generateCareTipsFlow',
    inputSchema: GenerateCareTipsInputSchema,
    outputSchema: GenerateCareTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
