import { readGlobalConfigJson } from '@/db/queries/globalConfig';
import { buildMergedConfig, type MergedConfig } from './config';

export const getMergedConfig = (workspaceId?: number | null): MergedConfig => {
  if (workspaceId != null) {
  }

  return buildMergedConfig({ globalConfig: readGlobalConfigJson() });
};
