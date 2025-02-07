import { getClient } from '../client';
import { updateContactInputSchema, updateContactOutputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const updateContact: Implementation['actions']['updateContact'] = async ({ ctx, client, logger, input }) => {
  const validatedInput = updateContactInputSchema.parse(input);

  const ghlClient = getClient(ctx.configuration.accessToken, ctx.configuration.refreshToken, ctx.configuration.clientId, ctx.configuration.clientSecret, ctx, client);

  logger.forBot().debug(`Validated Input - ${JSON.stringify(validatedInput)}`);

  try {
     const result = await ghlClient.updateContact(validatedInput.contactId, validatedInput.properties);
    
    logger.forBot().debug(`Successful - Update Contact - ${JSON.stringify(validatedInput)}`);
    logger.forBot().debug(`Result - ${JSON.stringify(result.data)}`);

    return { 
      success: result.success, 
      message: result.message, 
      data: result.data
    }
  } catch (error) {
    logger.forBot().debug(`'Update Contact' exception ${JSON.stringify(error)}`);
    throw error;
  }
};