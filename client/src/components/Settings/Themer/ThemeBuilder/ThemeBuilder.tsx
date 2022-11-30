import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Theme } from '../../../../interfaces';
import { authAtom } from '../../../../state/auth';
import { themeInEditAtom, userThemesAtom } from '../../../../state/theme';
import { Button, Modal } from '../../../UI';
import { ThemeGrid } from '../ThemeGrid/ThemeGrid';
import classes from './ThemeBuilder.module.css';
import { ThemeCreator } from './ThemeCreator';
import { ThemeEditor } from './ThemeEditor';

interface Props {
  themes: Theme[];
}

export const ThemeBuilder = ({ themes }: Props): JSX.Element => {
  const { isAuthenticated } = useAtomValue(authAtom);

  const [themeInEdit, setThemeInEdit] = useAtom(themeInEditAtom);
  const userThemes = useAtomValue(userThemesAtom);

  const [showModal, toggleShowModal] = useState(false);
  const [isInEdit, toggleIsInEdit] = useState(false);

  const showEdit = () => {
    toggleIsInEdit(true);
    toggleShowModal(true);
  };

  const showCreate = () => {
    setThemeInEdit(null);
    toggleIsInEdit(false);
    toggleShowModal(true);
  };

  // TODO: Refactor all useEffects to simplify
  useEffect(() => {
    if (themeInEdit) {
      toggleIsInEdit(false);
      toggleShowModal(true);
    }
  }, [themeInEdit]);

  useEffect(() => {
    if (isInEdit && !userThemes.length) {
      toggleIsInEdit(false);
      toggleShowModal(false);
    }
  }, [userThemes]);

  return (
    <div className={classes.ThemeBuilder}>
      {/* MODALS */}
      <Modal
        isOpen={showModal}
        setIsOpen={() => toggleShowModal(!showModal)}
        cb={() => setThemeInEdit(null)}
      >
        {isInEdit ? (
          <ThemeEditor modalHandler={() => toggleShowModal(!showModal)} />
        ) : (
          <ThemeCreator modalHandler={() => toggleShowModal(!showModal)} />
        )}
      </Modal>

      {/* USER THEMES */}
      <ThemeGrid themes={themes} />

      {/* BUTTONS */}
      {isAuthenticated && (
        <div className={classes.Buttons}>
          <Button click={showCreate}>Create new theme</Button>
          {themes.length ? (
            <Button click={showEdit}>Edit user themes</Button>
          ) : null}
        </div>
      )}
    </div>
  );
};
