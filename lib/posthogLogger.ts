import posthog from "posthog-js";

const isPostHogConfigured =
  Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) &&
  Boolean(process.env.NEXT_PUBLIC_POSTHOG_HOST);

type LogAttributes = Record<string, string | number | boolean>;

export const posthogLogger = {
  info(message: string, attributes: LogAttributes) {
    if (isPostHogConfigured) {
      posthog.logger.info(message, attributes);
    }
  },
};
