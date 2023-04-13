import { Box, InputAdornment, TextField, Typography } from '@material-ui/core'
import React from 'react'
import CustomButton from '../../components/common/Button/button'
import { Person as AccountIcon, VpnKey as Key } from '@material-ui/icons'
import './loginForm.scss'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import apiServices from '../../services/apiService'
import { notify } from 'react-notify-toast';
import { connect, useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import * as authActions from '../../store/auth/auth.actions'



const LoginForm = (props) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch()

  async function demoLoginUser(router, setIsLoading) {
    setIsLoading(true);

    dispatch(authActions.signinStart({ email, password }, props.history))



  }

  return (
    <Box component={'form'} onSubmit={() => demoLoginUser(
      email,
      password,
      props.history,
      setIsLoading,
    )
    } className='login-container'>
      <Box className='login-avatar'>
        <AccountIcon />
      </Box>
      <div className='form'>
        <Typography
          color='text'
          className='form_title'
        >
          User Log in
        </Typography>
        <TextField
          fullWidth
          id='filled-basic'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <AccountIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            placeholder: 'User ID',
            className: 'form_textfield'
          }}
        />
        <TextField
          fullWidth
          id='filled-basic'
          className='form_textfield'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Key />
              </InputAdornment>
            ),
            disableUnderline: true,
            placeholder: 'Password'
          }}
        />
        <CustomButton fullWidth type={'submit'} onClick={() => {
          demoLoginUser(

            props.history,
            setIsLoading,
          )
        }} disabled={isLoading} buttonText={isLoading ? 'loading' : 'LOGIN'} />
      </div>
      <Typography
        color='text'
        className='forgot_password'
      >
        Forgot <span>Password</span>?
      </Typography>
    </Box>
  )
}

const mapStateToProps = state => ({
  config: state.siteCoordinator.config,
  toaster: state.siteCoordinator.toaster,
  deploy: state.siteCoordinator.deploy
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));