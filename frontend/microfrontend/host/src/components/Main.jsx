import React, { lazy, Suspense } from 'react';

const Profile = lazy(() => import('profile/Profile').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
)

const CardList = lazy(() => import('feed/CardsList').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
)

function Main({ user }) {
  return (
    <main className="content">
      <Suspense>
        <Profile user={user} />
      </Suspense>
      <Suspense>
        <CardList user={user} />
      </Suspense>
    </main>
  );
}

export default Main;
