export const HomePage = () => {
    return (
        <div className='container'>
      <header>
        <div className='top-bar'></div>
        <div className='wrapper'>
          <a href=' ' className='logo' onClick={() => history.push('/')}>
            <img src='logo.png' alt='Emakina Timesheet' />
          </a>
          <ul className='user right'>
            <li>
              <a href='!#' onClick={handleProfileLink}>{userInfo.firstname} {userInfo.lastname}</a>
              <div className='invisible'></div>
              {openProfile && (<UserMenu />)}
            </li>
            <li className='last'>
              <a href='!#' onClick={logout}>Logout</a>
            </li>
          </ul>
          <nav>
            <Menu activeTab={activeTab} handleTabClick={handleTabClick} menuItems={menuItems}/>
            <MobileMenu activeTab={activeTab} handleTabClick={handleTabClick} menuItems={menuItems}/>
            <span className='line'></span>
          </nav>
        </div>
      </header>
      <div className='wrapper'>
        {renderTabContent()}
      </div>
      <Footer />
    </div>
    );
}