import { getClient } from '../client';
import { updateContactInputSchema, updateContactOutputSchema, upsertContactInputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const upsertContact: Implementation['actions']['upsertContact'] = async ({ ctx, client, logger, input }) => {
  const validatedInput = upsertContactInputSchema.parse(input);

  const ghlClient = getClient(ctx.configuration.accessToken, ctx.configuration.refreshToken, ctx.configuration.clientId, ctx.configuration.clientSecret, ctx, client);

  logger.forBot().debug(`Validated Input - ${JSON.stringify(validatedInput)}`);

  try {
     const result = await ghlClient.upsertContact(validatedInput.properties);
    
    logger.forBot().debug(`Successful - Upsert Contact - ${JSON.stringify(validatedInput)}`);
    logger.forBot().debug(`Result - ${JSON.stringify(result.data)}`);

    return { 
      success: result.success, 
      message: result.message, 
      data: result.data
    }
  } catch (error) {
    logger.forBot().debug(`'Upsert Contact' exception ${JSON.stringify(error)}`);
    throw error;
  }
};