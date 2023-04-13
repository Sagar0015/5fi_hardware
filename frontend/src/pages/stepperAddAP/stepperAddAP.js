import {
    Box, Container,
    CssBaseline
} from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import LinearStepper from './linearStepper'
import './stepperAddAP.scss'

function StepperAddAP(props) {

    return (
        <div className='access_point_container'>
            <CssBaseline />
            <Container component={Box} >
                <LinearStepper />
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    config: state.siteCoordinator.config,
    toaster: state.siteCoordinator.toaster
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(StepperAddAP)
