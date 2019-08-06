import React from 'react'

const input = (props) => {
    return (
        <div>
            New:
            <form>
                <input type="text" onChange={props.change} />

            </form>
            <button type="submit" onClick={props.save}>Save entry</button>

        </div>
    );
}

export default input;