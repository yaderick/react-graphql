import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import loginMutation from '../../graphql/loginMutation';
import { login } from './redux';
import './index.less';

class Login extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  };

  state = {
    mobile: '13813800000',
    password: '123456',
  };

  componentDidMount() {
    console.log(this.props.location.state);
  }

  handleLogin = async () => {
    const {
      state: { mobile, password },
      props: {
        history, location,
        client, loginSuccess,
      },
    } = this;
    const { data } = await client.mutate({
      mutation: loginMutation,
      variables: {
        mobile,
        password,
      },
      skip: mobile === '' || password === '',
    });
    loginSuccess({ token: data.createUserToken.token.token });
    history.push(location.state ? location.state.from : '/');
  };

  render() {
    return (
      <div>
        <button className="login-btn" onClick={this.handleLogin}>登录</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loginSuccess: login.success,
}, dispatch);

export default withApollo(withRouter(connect(null, mapDispatchToProps)(Login)));
