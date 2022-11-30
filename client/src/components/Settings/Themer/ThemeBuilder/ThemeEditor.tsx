import { useAtomValue, useSetAtom } from 'jotai';
import { Fragment } from 'react';
import { Theme } from '../../../../interfaces';
import {
  themeInEditAtom,
  useDeleteTheme,
  userThemesAtom,
} from '../../../../state/theme';
import { ActionIcons, CompactTable, Icon, ModalForm } from '../../../UI';

interface Props {
  modalHandler: () => void;
}

export const ThemeEditor = ({ modalHandler }: Props): JSX.Element => {
  const userThemes = useAtomValue(userThemesAtom);
  const setThemeInEdit = useSetAtom(themeInEditAtom);
  const deleteTheme = useDeleteTheme();

  const updateHandler = (theme: Theme) => {
    modalHandler();
    setThemeInEdit(theme);
  };

  const deleteHandler = (theme: Theme) => {
    if (window.confirm(`Are you sure you want to delete this theme?`)) {
      deleteTheme(theme.name);
    }
  };

  return (
    <ModalForm formHandler={() => {}} modalHandler={modalHandler}>
      <CompactTable headers={['Name', 'Actions']}>
        {userThemes.map((t, idx) => (
          <Fragment key={idx}>
            <span>{t.name}</span>
            <ActionIcons>
              <span onClick={() => updateHandler(t)}>
                <Icon icon="mdiPencil" />
              </span>
              <span onClick={() => deleteHandler(t)}>
                <Icon icon="mdiDelete" />
              </span>
            </ActionIcons>
          </Fragment>
        ))}
      </CompactTable>
    </ModalForm>
  );
};
