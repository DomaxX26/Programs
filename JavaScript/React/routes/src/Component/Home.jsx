import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';

function Home() {
    // Declara una nueva variable de estado, que llamaremos "count".
    const [count, setCount] = useState(0);

    // Similar a componentDidMount y componentDidUpdate:
    useEffect(() => {
        // Actualiza el título del documento usando la Browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <Button variant="danger" onClick={() => setCount(count + 1)}>
                Click me
        </Button>
        </div>
    );
}
export default Home; 