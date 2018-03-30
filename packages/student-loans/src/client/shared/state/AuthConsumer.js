import React, {Component} from 'react'

import {createConsumer} from './StateProvider'

const AuthConsumer = createConsumer(state => state.auth)

export default AuthConsumer
