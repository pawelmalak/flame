import { GeneralForm } from '@/components/settings/general/GeneralForm';
import { getKeysLockedByEnv } from '@/lib/config';
import { getMergedConfig } from '@/lib/mergedConfig';

export default function GeneralSettingsPage() {
  const config = getMergedConfig();
  const envLockedKeys = Array.from(getKeysLockedByEnv());

  return <GeneralForm initialConfig={config} envLockedKeys={envLockedKeys} />;
}
