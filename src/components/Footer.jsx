import React, { memo } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Hidden from '@material-ui/core/Hidden';

import MainNavigation from "../components/MainNavigation"
import SocialIcons from '../components/SocialIcons'
import LanguageSelect from '../components/LanguageSelect';
import Logo from '../picture/logo.png';

function Footer({ handleLogoClicked }) {

    return (
        <footer className="footer-wrapper">
            <Grid className="footer" container alignItems="center">
                <Grid item xs={4} md={1}>
                    <img onClick={() => handleLogoClicked()} className="logo hand" src={Logo}/>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Box className="padd-lft push-lft-hlf">
                        <MainNavigation from='Footer'/>
                    </Box>
                </Grid>
                <Hidden mdUp>
                    <Grid item xs={4} md={7}>
                        <Paper className='footer-paper-language'>
                            <LanguageSelect className='footer-selector' />
                        </Paper>
                    </Grid>
                </Hidden>
                <Grid item xs={6} md={6}>
                    <p className="no-push o-mid t-center">Copyright © 2020 Jan Entertainment</p>
                </Grid>
                <Grid item xs={6} md={3}>
                    <SocialIcons/>
                </Grid>
            </Grid>
        </footer>
    );
}

export default memo(Footer)
