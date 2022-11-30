import { useAtomValue } from 'jotai';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DockerSettingsForm } from '../../../interfaces';
import {
  configAtom,
  configLoadingAtom,
  useUpdateConfig,
} from '../../../state/config';
import { dockerSettingsTemplate, inputHandler } from '../../../utility';
import { Button, InputGroup, SettingsHeadline } from '../../UI';
import { Checkbox } from '../../UI/Checkbox/Checkbox';

export const DockerSettings = (): JSX.Element => {
  const loading = useAtomValue(configLoadingAtom);
  const config = useAtomValue(configAtom);
  const updateConfig = useUpdateConfig();

  // Initial state
  const [formData, setFormData] = useState<DockerSettingsForm>(
    dockerSettingsTemplate
  );

  // Get config
  useEffect(() => {
    setFormData({
      ...config,
    });
  }, [loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Save settings
    await updateConfig(formData);
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<DockerSettingsForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  const onBooleanToggle = (prop: keyof DockerSettingsForm) =>
    setFormData((prev) => ({ ...prev, [prop]: !prev[prop] }));

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <SettingsHeadline text="Docker" />
      {/* CUSTOM DOCKER SOCKET HOST */}
      <InputGroup>
        <label htmlFor="dockerHost">Docker host</label>
        <input
          type="text"
          id="dockerHost"
          name="dockerHost"
          placeholder="dockerHost:port"
          value={formData.dockerHost}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      {/* USE DOCKER API */}
      <InputGroup type="horizontal">
        <Checkbox
          id="dockerApps"
          checked={formData.dockerApps}
          onClick={() => onBooleanToggle('dockerApps')}
        />
        <label htmlFor="dockerApps">Use Docker API</label>
      </InputGroup>

      {/* UNPIN DOCKER APPS */}
      <InputGroup type="horizontal">
        <Checkbox
          id="unpinStoppedApps"
          checked={formData.unpinStoppedApps}
          onClick={() => onBooleanToggle('unpinStoppedApps')}
        />
        <label htmlFor="unpinStoppedApps">
          Unpin stopped containers / other apps
        </label>
      </InputGroup>

      {/* KUBERNETES SETTINGS */}
      <SettingsHeadline text="Kubernetes" />
      {/* USE KUBERNETES */}
      <InputGroup type="horizontal">
        <Checkbox
          id="kubernetesApps"
          checked={formData.kubernetesApps}
          onClick={() => onBooleanToggle('kubernetesApps')}
        />
        <label htmlFor="kubernetesApps">Use Kubernetes Ingress API</label>
      </InputGroup>

      <Button>Save changes</Button>
    </form>
  );
};
