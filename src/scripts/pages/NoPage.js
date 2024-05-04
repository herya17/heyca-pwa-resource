import React from 'react';
import EmptyMessage from '../components/EmptyMessage';
import LocaleContext from '../contexts/LocaleContext';

function NoPage() {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;

  return (
    <div className='no-page'>
      <EmptyMessage
        message={locale === 'id' ? 'Halaman tidak dikenal' : 'Unknown page'}
        isNoPage={true} />
    </div>
  );
}

export default NoPage;
