import React from 'react';

import style from './settings.module.scss';
import SettingsForm from './components/settingsForm';

const Settings = () => (
  <div className={style.setting}>
    <SettingsForm />
  </div>
);

export default Settings;
