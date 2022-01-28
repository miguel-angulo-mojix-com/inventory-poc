import React, {useEffect, useState} from 'react';
import InventoryPocUtils from '../utils'

const HeaderSection = ({isSubscribed, handleSubscribe, handleFilters}) => {
  const [tenant, setTenant] = useState('IKEA');
  const [site, setSite] = useState('1234567');

  useEffect(() => {
    handleFilters(`${tenant}-${site}-${InventoryPocUtils.getSubscriptionDate()}`)
  }, [])

  return (
    <div className="header-section">
      <div className="filters-section">
        <div className="filter-select">
          <label className="d-flex flex-column">Site:
            <select className="dropdown-menu-select">
              <option>Ikea Main Store</option>
            </select>
          </label>
        </div>
        <div className="filter-select">
          <label className="d-flex flex-column">Department:
            <select className="dropdown-menu-select">
              <option>All</option>
            </select>
          </label>
        </div>
        <div className="filter-select">
          <label className="d-flex flex-column">Zone:
            <select className="dropdown-menu-select">
              <option>All</option>
            </select>
          </label>
        </div>
      </div>
      <div className="subs-btn-section">
        <button className="btn btn-sm btn-info buttons-size" onClick={handleSubscribe}>
          {`${!isSubscribed? 'SUBSCRIBE':'UNSUBSCRIBE'}`}
          {/*{isSubscribed}*/}
        </button>
      </div>
    </div>
  )
}

export default HeaderSection;