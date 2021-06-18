import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Redux
import { connect } from 'react-redux';
import { createNotification, updateConfig, sortApps } from '../../../store/actions';

// Typescript
import { GlobalState, NewNotification, SettingsForm } from '../../../interfaces';

// UI
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';

// Utils
import { searchConfig } from '../../../utility';

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
  updateConfig: (formData: SettingsForm) => void;
  sortApps: () => void;
  loading: boolean;
}

const OtherSettings = (props: ComponentProps): JSX.Element => {
  // Initial state
  const [formData, setFormData] = useState<SettingsForm>({
    customTitle: document.title,
    pinAppsByDefault: 1,
    pinCategoriesByDefault: 1,
    hideHeader: 0,
    useOrdering: 'createdAt'
  })

  // Get config
  useEffect(() => {
    setFormData({
      customTitle: searchConfig('customTitle', 'Flame'),
      pinAppsByDefault: searchConfig('pinAppsByDefault', 1),
      pinCategoriesByDefault: searchConfig('pinCategoriesByDefault', 1),
      hideHeader: searchConfig('hideHeader', 0),
      useOrdering: searchConfig('useOrdering', 'createdAt')
    })
  }, [props.loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Save settings
    await props.updateConfig(formData);

    // Update local page title
    document.title = formData.customTitle;

    // Get sorted apps
    props.sortApps();
  }

  // Input handler
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, isNumber?: boolean) => {
    let value: string | number = e.target.value;

    if (isNumber) {
      value = parseFloat(value);
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <InputGroup>
        <label htmlFor='customTitle'>Custom page title</label>
        <input
          type='text'
          id='customTitle'
          name='customTitle'
          placeholder='Flame'
          value={formData.customTitle}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor='pinAppsByDefault'>Pin new applications by default</label>
        <select
          id='pinAppsByDefault'
          name='pinAppsByDefault'
          value={formData.pinAppsByDefault}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor='pinCategoriesByDefault'>Pin new categories by default</label>
        <select
          id='pinCategoriesByDefault'
          name='pinCategoriesByDefault'
          value={formData.pinCategoriesByDefault}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor='hideHeader'>Hide greeting and date</label>
        <select
          id='hideHeader'
          name='hideHeader'
          value={formData.hideHeader}
          onChange={(e) => inputChangeHandler(e, true)}
        >
          <option value={1}>True</option>
          <option value={0}>False</option>
        </select>
      </InputGroup>
      <InputGroup>
        <label htmlFor='useOrdering'>Sorting type</label>
        <select
          id='useOrdering'
          name='useOrdering'
          value={formData.useOrdering}
          onChange={(e) => inputChangeHandler(e)}
        >
          <option value='createdAt'>By creation date</option>
          <option value='name'>Alphabetical order</option>
          <option value='orderId'>Custom order</option>
        </select>
      </InputGroup>
    <Button>Save changes</Button>
    </form>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.config.loading
  }
}

export default connect(mapStateToProps, { createNotification, updateConfig, sortApps })(OtherSettings);