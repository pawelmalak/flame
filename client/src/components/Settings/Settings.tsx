import { Link } from 'react-router-dom';

import Themer from '../Themer/Themer';

const Settings = (): JSX.Element => {
  return (
    <div>
      <h1>settings</h1>
      <Link to='/'>Home</Link>
      <Themer />
    </div>
  )
}

export default Settings;