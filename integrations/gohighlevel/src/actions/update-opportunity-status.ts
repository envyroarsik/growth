import { getClient } from '../client';
import { updateOpportunityStatusInputSchema, updateOpportunityStatusOutputSchema } from '../misc/custom-schemas';
import type { Implementation } from '../misc/types';

export const updateOpportunityStatus: Implementation['actions']['updateOpportunityStatus'] = async ({ ctx, client, logger, input }) => {
  const validatedInput = updateOpportunityStatusInputSchema.parse(input);

  const ghlClient = getClient(ctx.configuration.accessToken, ctx.configuration.refreshToken, ctx.configuration.clientId, ctx.configuration.clientSecret, ctx, client);

  logger.forBot().debug(`Validated Input - ${JSON.stringify(validatedInput)}`);

  try {
    const result = await ghlClient.updateOpportunityStatus(validatedInput.opportunityId, validatedInput.status);
    
    logger.forBot().info(`Successful - Update Opportunity Status - ${JSON.stringify(validatedInput)}`);
    logger.forBot().info(`Result - ${JSON.stringify(result.data)}`);

    return { 
      success: result.success, 
      message: result.message, 
      data: result.data 
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    logger.forBot().error(`'Update Opportunity Status' exception: ${JSON.stringify(errorMessage)}`);

    return { 
      success: false, 
      message: errorMessage, 
      data: null 
    };
  }
};