import React from 'react';

function ShowLoanInfo (props) {
  return (
    <h2>{ `Student Loan (${props.loan.id})` }</h2>
  );
}

export default ShowLoanInfo;
