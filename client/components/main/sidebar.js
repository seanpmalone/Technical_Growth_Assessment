import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './sidebar.css';
import { Image, Form, Grid, Button } from 'semantic-ui-react';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

const SidebarExample = (props) => (
  <Router>
    <div>
    <div>
      <div className="ui left fixed vertical menu inverted pusher scrollable">
        <div className="item">
            <h1>loose</h1>
          </div>
          <div className="item">
            <Form className='STARTING-FORM' onSubmit={props.addUserToTeam} >
                <Form.Input name='team name' size={'small'} placeholder='Username' width={14} onChange={props.onChange} />
                <Button type='submit'>Invite User to Team</Button>
            </Form>
          </div>
          <Link to="/profile"><a className="header item">username</a></Link>
          <div className="header item" >CHANNELS</div>
          <Link to="/"><a className="item">Home</a></Link>
          <Link to="/bubblegum"><a className="item">Bubblegum</a></Link>
        <Link to="/shoelaces"><a className="item lastitem">Shoelaces</a></Link>
        <div className="header item" >DIRECT MESSAGES</div>
        <Link to="/"><a className="item">Home</a></Link>
        <Link to="/bubblegum"><a className="item">Bubblegum</a></Link>
        <Link to="/shoelaces"><a className="item">Shoelaces</a></Link>
        <Button size={'mini'} onClick={props.logout}>Log out</Button>
        <div>

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>
    <div style={{ flex: 1, padding: "10px" }}>
      {routes.map((route, index) => (
        // Render more <Route>s with the same paths as
        // above, but different components this time.
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}
    </div>
      </div>
    </div>

    </div>
  </Router>
);

export default SidebarExample;