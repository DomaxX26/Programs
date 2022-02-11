import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
function Categoria() {

    const { id } = useParams();

    switch (id) {
        case '1':
            return (<React.Fragment>
                <h1>New Products</h1>
                <a href="/">Home</a>
            </React.Fragment>
            );
        case '2':
            return (<React.Fragment>
                <h1>Awesome</h1>
                <a href="/">Home</a>
            </React.Fragment>
            );
        case '3':
            return (<React.Fragment>
                <h1>Something</h1>
                <a href="/">Home</a>
            </React.Fragment>
            );
        case '4':
            return (<React.Fragment>
                <h1>Last News</h1>
                <a href="/">Home</a>dgmdkmstyks
            </React.Fragment>
            );
        default:
            return (<React.Fragment>
                <Navigate to='/404' />
            </React.Fragment>
            );
    }
}

export default Categoria; 