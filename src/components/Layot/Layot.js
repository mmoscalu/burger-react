import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layot.css';

const layot = (props) => (
    <Aux>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layot;