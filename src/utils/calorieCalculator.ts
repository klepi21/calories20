// utils/calorieCalculator.ts
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY,
});

export async function calculateCalories(foodInput: string, retryCount = 0) {
  try {
    const response = await cohere.generate({
      model: "command",
      prompt: `You are a nutritionist. Given a list of foods, estimate the calories for each item and return ONLY a JSON array with the food name and estimated calories. Do not include any explanatory text. Calculate calories for: ${foodInput}`,
      maxTokens: 100,
      temperature: 0.7,
      k: 0,
      stopSequences: [],
      returnLikelihoods: "NONE"
    });

    const generatedText = response.generations[0].text.trim();
    let result;
    try {
      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in the response');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON:', generatedText);
      throw new Error('Invalid JSON response from API');
    }

    return result;
  } catch (error: any) {
    console.error('Error calculating calories:', error);

    // Implement retry logic if needed
    if (retryCount < 5) {
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return calculateCalories(foodInput, retryCount + 1);
    }

    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }

    return [];
  }
}

