import './App.less';
import { Layout, Menu, Breadcrumb, Typography, Button, Popover } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  GlobalOutlined,
  BugOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Route, Link, withRouter } from "react-router-dom";

//PAGES
import Dashboard from './pages/dashboard'
import Regions from './pages/region/region'
import Admins from './pages/admin/admin'
import Data from './pages/data/data'

const { Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render(){
    const { collapsed } = this.state;
    const path = this.props.location.pathname.split("/");
    
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          {
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={this.onCollapse} breakpoint="lg">
              <div style={{ padding: 10, paddingTop: 25, paddingBottom: 25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img style={{ maxWidth: "90%", filter: 'invert()' }} />
              </div>
              <Menu theme="light" defaultSelectedKeys={path} mode="inline">

                <Menu.Item key="dashboard" icon={<DesktopOutlined />}>
                    <Link to="/">
                      Dashboard
                    </Link>
                </Menu.Item>

                <Menu.Item key="admin" icon={<UserOutlined />}>
                  <Link to="/admin">
                    Admin
                  </Link>
                </Menu.Item>

                <Menu.Item key="region" icon={<GlobalOutlined />}>
                  <Link to="/region">
                    Region
                  </Link>
                </Menu.Item>

                <Menu.Item key="data" icon={<BugOutlined />}>
                  <Link to="/data">
                    Data
                  </Link>
                </Menu.Item>

              </Menu>
            </Sider> 
          }
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px', padding: 25 }}>

              <Breadcrumb>
                <Breadcrumb.Item><Link to="/">COVID</Link></Breadcrumb.Item>
                {
                  path.map((str, i) => {
                    var upc = str.split('-');
                    upc = upc.map(w => { return w.charAt(0).toUpperCase() + w.slice(1); });
                    return (
                      <Breadcrumb.Item key={i}>
                        {
                          upc.join(" ")
                        }
                      </Breadcrumb.Item>
                    );
                  })
                }
              </Breadcrumb>

              <Route exact path="/" component={Dashboard} />
              <Route path="/admin" component={Admins} />
              <Route path="/region" component={Regions} />
              <Route path="/data" component={Data}/>

            </Content>
            <Footer style={{ textAlign: 'center' }}>PROJEKT AIV</Footer>
          </Layout>
        </Layout >
      </div>
    );
  }
}
export default withRouter(App);
