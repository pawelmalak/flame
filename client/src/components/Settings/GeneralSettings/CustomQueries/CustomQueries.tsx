import { useAtomValue } from 'jotai';
import { Fragment, useState } from 'react';
import { Query } from '../../../../interfaces';
import { configAtom } from '../../../../state/config';
import { useCreateNotification } from '../../../../state/notification';
import { customQueriesAtom, useDeleteQuery } from '../../../../state/queries';
import { ActionIcons, Button, CompactTable, Icon, Modal } from '../../../UI';
import { QueriesForm } from './QueriesForm';

export const CustomQueries = (): JSX.Element => {
  const customQueries = useAtomValue(customQueriesAtom);
  const deleteQuery = useDeleteQuery();
  const config = useAtomValue(configAtom);
  const createNotification = useCreateNotification();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableQuery, setEditableQuery] = useState<Query | null>(null);

  const updateHandler = (query: Query) => {
    setEditableQuery(query);
    setModalIsOpen(true);
  };

  const deleteHandler = (query: Query) => {
    const currentProvider = config.defaultSearchProvider;
    const isCurrent = currentProvider === query.prefix;

    if (isCurrent) {
      createNotification({
        title: 'Error',
        message: 'Cannot delete active provider',
      });
    } else if (
      window.confirm(`Are you sure you want to delete this provider?`)
    ) {
      deleteQuery(query.prefix);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={() => setModalIsOpen(!modalIsOpen)}
      >
        {editableQuery ? (
          <QueriesForm
            modalHandler={() => setModalIsOpen(!modalIsOpen)}
            query={editableQuery}
          />
        ) : (
          <QueriesForm modalHandler={() => setModalIsOpen(!modalIsOpen)} />
        )}
      </Modal>

      <section>
        {customQueries.length ? (
          <CompactTable headers={['Name', 'Prefix', 'Actions']}>
            {customQueries.map((q: Query, idx) => (
              <Fragment key={idx}>
                <span>{q.name}</span>
                <span>{q.prefix}</span>
                <ActionIcons>
                  <span onClick={() => updateHandler(q)}>
                    <Icon icon="mdiPencil" />
                  </span>
                  <span onClick={() => deleteHandler(q)}>
                    <Icon icon="mdiDelete" />
                  </span>
                </ActionIcons>
              </Fragment>
            ))}
          </CompactTable>
        ) : null}

        <Button
          click={() => {
            setEditableQuery(null);
            setModalIsOpen(true);
          }}
        >
          Add new search provider
        </Button>
      </section>
    </>
  );
};
