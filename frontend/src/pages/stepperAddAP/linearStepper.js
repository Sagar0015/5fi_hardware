import {
  Box,
  CircularProgress,
  Collapse, FormLabel,
  Grid, Paper,
  TextField,
  Typography,
  LinearProgressProps,
  LinearProgress,
  withStyles,
  createStyles,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import CustomButton from '../../components/common/Button/button'
import apiServices from '../../services/apiService'
import './stepperAddAP.scss'
import loadingGif from '../../images/home/loading.gif'
import tuningGif from '../../images/app/tuning.gif'
import { NavLink } from 'react-router-dom';
import Accordion from './Accordion'
import { notify } from 'react-notify-toast'




function LinearStepper(props) {
  return (
    <Box>
      <AddAccessPointForm {...props} />
    </Box>
  )
}
const AddAccessPointForm = ({ toaster }) => {

  const [progress, setProgress] = React.useState(0);
  const [serialLoading, setSerialLoading] = React.useState(false);
  const [ranParamsLoading, setRanParamsLoading] = React.useState(false);
  const [deployLoading, setDeployLoading] = React.useState(false);
  const [deploySuccess, setDeploySuccess] = React.useState(false);

  const [tuningLoading, setTuningLoading] = React.useState(false);
  const [tuningSuccess, setTuningSuccess] = React.useState(false);




  const [serial, setSerial] = React.useState('');
  const [serialNo, setSerialNo] = React.useState('');
  const [ranParams, setRanParams] = React.useState(null);

  async function deployAP() {
    try {
      setDeployLoading(true)
      const result = await axios.all([apiServices.deployAP(ranParams, setProgress)])
      if (result) {
        if (result && result[0].data.includes("Deployed Sucessfully")) {
          setDeploySuccess(true)

        } else {
          setDeploySuccess(false)
          notify.show(result[0].data ?? "Something went wrong", "custom", toaster.duration, toaster.error);

        }
      }


    } catch (error) {
      notify.show("Something went wrong", "custom", toaster.duration, toaster.error);

      setDeploySuccess(false)

      console.log(error);
      console.log('An error occurred add subscriber element service');
    }
    setDeployLoading(false)


  }

  async function tuning() {
    try {
      setTuningLoading(true)
      const result = await axios.all([apiServices.tuning()],)
      if (result && !!result.length) {
        console.log(result)
        setTuningSuccess(true)
        deployAP()
      } else {
        notify.show(result[0].data ?? "Something went wrong", "custom", toaster.duration, toaster.error);
      }


    } catch (error) {
      notify.show("Something went wrong", "custom", toaster.duration, toaster.error);

      console.log(error);
      console.log('An error occurred add subscriber element service');
    }
    setTuningLoading(false)


  }

  async function validate_ap() {
    try {
      setSerialLoading(true)
      const result = await axios.all([apiServices.validateAP()])
      if (result && !!result.length && result[0].data.includes("serial")) {
        setSerial(result[0]?.data.split(':')[0])
        setSerialNo(result[0]?.data.split(':')[1])
        getRanParameters()
      }
      else {
        notify.show(result[0]?.data ?? "Something went wrong", "custom", toaster.duration, toaster.error);

      }


    } catch (error) {
      notify.show("Something went wrong", "custom", toaster.duration, toaster.error);

      console.log('An error occurred add subscriber element service');
    }
    setSerialLoading(false)


  }

  async function getRanParameters() {
    try {
      setRanParamsLoading(true)
      const result = await axios.all([apiServices.getRanParameters()])
      if (result && !!result.length) {
        console.log(result)
        setRanParams(result[0].data)
      } else {
        notify.show(result[0]?.data ?? "Something went wrong", "custom", toaster.duration, toaster.error);

      }


    } catch (error) {
      notify.show("Something went wrong", "custom", toaster.duration, toaster.error);


      console.log(error);
      console.log('An error occurred add subscriber element service');
    }
    setRanParamsLoading(false)


  }

  React.useEffect(() => {
    validate_ap()
  }, [])

  const handleRanParamsChange = (name, value) => {
    let newParams = ranParams
    newParams[name] = value
    setRanParams({
      ...newParams,
    })
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          color='text'
          className='title'
        >
          Add 5-Fi Access point
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Accordion loading={serialLoading} valid={serialNo && !!serialNo.length} enableValidation title={'Found your 5-Fi Access point'}>
          <Box>
            <Grid container item xs={12} sm={6}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id='filled-basic'
                  InputProps={{
                    disableUnderline: true,
                    className: 'form_textfield'
                  }}
                  value={serial}
                />
              </Grid>
              <Grid item xs={1}>
                <Box className='align_sign'>-</Box>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id='filled-basic'
                  InputProps={{
                    disableUnderline: true,
                    className: 'form_textfield'
                  }}
                  value={serialNo}

                />
              </Grid>
            </Grid>
          </Box>
        </Accordion>
      </Grid>
      <Grid container item xs={12}>
        <Collapse in={!serialLoading && serialNo}>
          <Accordion loading={ranParamsLoading} valid={ranParams} enableValidation title={'Configuring your Access point automatically'}>
            <Box className='field'>
              <Grid container spacing={2}>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        NR_Band
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.Band}
                      onChange={(e) => {
                        handleRanParamsChange('Band', e.target.value)
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container alignItems='center' item xs={12}>

                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        AMF_IP
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.AMF_IP}

                    />
                  </Grid>
                </Grid>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        MCC
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.MCC}

                    />
                  </Grid>
                </Grid>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        MNC
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.MNC}

                    />
                  </Grid>
                </Grid>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        TAC
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.TAC}

                    />
                  </Grid>
                </Grid>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        SST
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.SST}

                    />
                  </Grid>
                </Grid>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        SD
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.SD}

                    />
                  </Grid>

                </Grid>
                <Grid container alignItems='center' item xs={12}>
                  <Grid item xs={4} sm={3} md={2} lg={1}>
                    <FormLabel>
                      <Typography className='content'>
                        Gain
                      </Typography>
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      disabled={ranParamsLoading}
                      InputProps={{
                        disableUnderline: true,
                        className: 'addAP_textfield'
                      }}
                      value={ranParams?.Gain}

                    />
                  </Grid>

                </Grid>

              </Grid>
            </Box>
          </Accordion>
        </Collapse>

        <Grid item xs={12}>
          <Collapse in={!serialLoading && serialNo && ranParams}>

            <Box width={'30%'} m={'10px 0 20px 0'}>

              <CustomButton
                onClick={() => { tuning() }}
                buttonText={tuningLoading && deployLoading ? 'Deploying' : 'Deploy'}
                fullWidth
                disabled={tuningLoading && deployLoading}
              />
            </Box>
          </Collapse>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Collapse in={tuningLoading || deployLoading || tuningSuccess}>
          <Accordion initChecked={!deploySuccess} valid={tuningSuccess && deploySuccess} loading={tuningLoading || deployLoading} enableValidation title={'Tuning Radio parameters for you'}>
            <Box display={'flex'} flexDirection={'column'} justifyItems={'center'} alignItems={'center'} margin={'0 auto'} width={'40%'}>

              <img className='tuning' src={tuningGif} alt={'loadng'} />
              {/* <Box width={'100%'}>

                <LinearProgressWithLabel value={12} />
              </Box> */}

            </Box>
          </Accordion>
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={deploySuccess && tuningSuccess}>
          <Accordion valid={deploySuccess && tuningSuccess} enableValidation title={'You are all set'} />
        </Collapse>
        <Grid item xs={12}>
          <Collapse in={deploySuccess && tuningSuccess}>

            <Box width={'15%'} m={'10px 0 20px 0'}>
              <NavLink to={'/monitor'}>
                <CustomButton
                  buttonText={'Done'}
                  fullWidth
                />
              </NavLink>
            </Box>
          </Collapse>

        </Grid>
      </Grid>
    </Grid >
  )
}
const BorderLinearProgress = withStyles((theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


const mapStateToProps = state => ({
  config: state.siteCoordinator.config,
  toaster: state.siteCoordinator.toaster
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LinearStepper)
