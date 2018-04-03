import * as FirebaseClient from '../../../shared/wrappers/FirebaseClient'

export function fetchLoans() {
  return new Promise((resolve, reject) => {
    FirebaseClient.getAll('loans')
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function createLoan(loan) {
  return new Promise((resolve, reject) => {
    FirebaseClient.add('loans', loan)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateLoan(loanId, loan) {
  return new Promise((resolve, reject) => {
    FirebaseClient.set('loans', loanId, loan)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteLoan(loanId) {
  return new Promise((resolve, reject) => {
    FirebaseClient.remove('loans', loanId)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
