import React from 'react'

export const BodegaItem = ({name}) => {
    return (
        <div>
             <Nav.Item className="nav-item">
              <Nav.Link className="nav-link-lb" eventKey="link-1">
                <p>{name}</p>
              </Nav.Link>
            </Nav.Item>
        </div>
    )
}
