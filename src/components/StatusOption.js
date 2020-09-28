import React from 'react';
import PropTypes from 'prop-types';


export const StatusOption = props => (
  <>
    <select className="form-control" name={props.name} id={props.id} value={props.value} onChange={props.onChange}>
      <option value="100">All</option>
      <option value="0">Pending</option>
      <option value="1">Confirm</option>
      <option value="2">Manual</option>
      <option value="3">Reject</option>
      <option value="7">Failed</option>
      <option value="6">Error</option>
      <option value="5">Temp</option>
      <option value="4">Cancel</option>
    </select>
  </>
);

StatusOption.prototype = {
  id: PropTypes.string,
  name: PropTypes.name,
  value: PropTypes.integer,
  onChange: PropTypes.string,
};
