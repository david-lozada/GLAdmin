import React from 'react';
import { Grid, Container } from '@material-ui/core'

const Page404 = ({ match }) => {
    return (
    	<Container maxWidth="lg">
    		<Grid container spacing={3}>
    			<Grid item xs={4}></Grid>
    			<Grid item xs={5}>
	        		<h1>Página { match.url } no encontrada</h1>
    			</Grid>
        	</Grid>
        </Container>
    );
};

export default Page404;
