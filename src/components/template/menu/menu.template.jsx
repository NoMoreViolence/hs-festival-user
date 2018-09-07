import React from 'react';
import './menu.template.scss';
import MenuContainer from '../../../container/menu.container';

class Menu extends React.PureComponent {
  render() {
    return (
      <div className="menu-container">
        <MenuContainer />
      </div>
    );
  }
}

export default Menu;
