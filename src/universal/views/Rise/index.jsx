import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { logout } from '../Login/redux';
import getOrganization from '../../graphql/queries';

const organizationName = 'the-road-to-learn-react';

class Rise extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    loginState: PropTypes.bool.isRequired,
    logoutAction: PropTypes.func.isRequired,
  };

  state = {
    organization: null,
  }

  init = async (client) => {
    const { data: { organization } } = await client.query({
      query: getOrganization,
      variables: {
        organizationName,
        cursor: null,
      },
      skip: organizationName === '',
    });
    this.setState({ organization });
  };

  renderOrganization = (organization) => {
    const {
      name, login, url, repositories,
    } = organization;
    return (
      <div>
        <div>name: {name}</div>
        <div>login: {login}</div>
        <div>url: {url}</div>
        <br />
        {repositories.edges.map(({ node }) => (
          <div key={node.id} className="Repository">
            <div>
              {node.id} | {node.name} | {node.url}
              <div dangerouslySetInnerHTML={{ __html: node.descriptionHTML }} />
              <div>
                {node.stargazers.totalCount}
                | {node.viewerHasStarred.toString()}
                | {node.watchers.totalCount}
              </div>
              <div>{node.viewerSubscription}</div>
            </div>
            <br />
          </div>
        ))}
        <div>
          {`${repositories.pageInfo.endCursor} / ${repositories.pageInfo.hasNextPage}`}
        </div>
      </div>
    );
  };

  render = () => (
    <div>
      <h1>登录状态：{this.props.loginState}</h1>
      <h2>恭喜登陆成功---》进入Rise 业务页面</h2>
      <button onClick={this.props.logoutAction}>登出</button>
      <div>
        <button onClick={() => { this.init(this.props.client); }}>click me!</button>
        <div>
          {(this.state.organization !== null) && this.renderOrganization(this.state.organization)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loginState: state.loginReducer.isAuthenticated,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logoutAction: logout.request,
}, dispatch);

export default withApollo(withRouter(connect(mapStateToProps, mapDispatchToProps)(Rise)));
