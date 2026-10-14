import {
  type EmailDocumentStringContext,
  isDefined,
  parseTemplateVariableWithFallback,
} from 'twenty-shared/utils';
import { CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX } from 'twenty-shared/workflow';

import { escapeHtml } from 'src/engine/core-modules/emailing-domain/utils/escape-html.util';
import { resolveCampaignVariableValue } from 'src/modules/emailing/utils/resolve-campaign-variable-value.util';

const encodeValueForContentType = (
  value: string,
  contentType: EmailDocumentStringContext,
): string => {
  switch (contentType) {
    case 'html':
    case 'rawHtml':
      return escapeHtml(value);
    case 'text':
      return value;
    case 'url':
      return encodeURIComponent(value);
  }
};

export const renderCampaignTemplate = (
  template: string,
  variables: Record<string, string>,
  contentType: EmailDocumentStringContext,
): string =>
  template.replace(
    CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX,
    (rawTemplateVariable) => {
      const campaignVariable =
        parseTemplateVariableWithFallback(rawTemplateVariable);

      if (!isDefined(campaignVariable)) {
        return rawTemplateVariable;
      }

      const value = resolveCampaignVariableValue({
        campaignVariable,
        variables,
      });

      return encodeValueForContentType(value, contentType);
    },
  );
