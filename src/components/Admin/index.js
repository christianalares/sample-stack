import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { signIn } from '../../actions/auth.js'
import { toggleUserRegister } from '../../actions/admin'
import { registerUser } from '../../actions/admin'

import bcrypt from 'bcrypt-nodejs'

import styles from './admin.css'

export class Admin extends Component {
	constructor (props) {
		super(props)

        this.state = {
            email: null,
            password: null,
            nameRegister: null,
            emailRegister: null,
            passwordRegister: null
        }
	}
    
    // getSalt() {
    //     return bcrypt.genSalt(10, () => {})
    // }

    handleSubmit(e) {
        e.preventDefault()

        
        
        // var salt = bcrypt.genSalt(10, () => {})
        
        // bcrypt.hash(this.state.password, salt, null, function(err, hash) {
        //     console.log( 'error: ' + err, 'hash: ' + hash, 'salt: ' + salt )
        // });

        // this.props.dispatch(signIn(this.state, '/teacher'))
    }

    handleRegisterSubmit(e) {
        e.preventDefault()

        bcrypt.genSalt(10, (error, result) => {

            bcrypt.hash(this.state.password, result, null, (err, hash) => {

                var credentials = {
                    name: this.state.registerName,
                    password: hash,
                    salt: result,
                    email: this.state.registerEmail,
                }

                // console.log( credentials )
                this.props.dispatch( registerUser(credentials) )
            })

        })
        

    }

    handleClick(loginOrRegister) {
        this.props.dispatch( toggleUserRegister(loginOrRegister) )
    }

    renderContent() {
        if (this.props.loginOrRegister === 'login') {
            return (
                <div className={styles.login}>
                    <h1>Logga in</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label htmlFor="email">Email</label>
                        <input ref="email" onChange={e => this.setState({email: e.target.value})} id="email" type="email" />
                        <label htmlFor="password">Lösenord</label>
                        <input ref="password" onChange={e => this.setState({password: e.target.value})} id="password" type="text" />
                        <input type="submit" value="Logga in" />
                    </form>
                    <a href="#" onClick={() => this.handleClick('register')}>Registrera ny användare...</a>
                </div>
            )
        } else {
            return (
                <div className={styles.login}>
                    <h1>Registrera ny användare</h1>
                    <form onSubmit={this.handleRegisterSubmit.bind(this)}>
                        <label htmlFor="name">För och efternamn</label>
                        <input ref="name" onChange={e => this.setState({registerName: e.target.value})} id="name" type="text" />

                        <label htmlFor="email">Email</label>
                        <input ref="email" onChange={e => this.setState({registerEmail: e.target.value})} id="email" type="text" />
                        
                        <label htmlFor="password">Lösenord</label>
                        <input ref="password" onChange={e => this.setState({registerPassword: e.target.value})} id="password" type="text" />
                        <input type="submit" value="Registrera" />
                    </form>
                    <a href="#" onClick={() => this.handleClick('login')}>Tillbaka till inloggning...</a>
                </div>
            )
        }
    }

	render () {

		return (
            <div>
                {this.renderContent()}
            </div>
        )
	}
}

function mapStateToProps (state) {
	return {
		loginOrRegister: state.admin.loginOrRegister,
	}
}

export default connect(mapStateToProps)(Admin)
