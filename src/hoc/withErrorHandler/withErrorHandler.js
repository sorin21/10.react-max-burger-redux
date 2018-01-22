import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrapperdComponent, axios) => {
  // Anounimous class
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      // Create new properties on the fly this.reqInterceptor
      // this refers to the class
      this.reqInterceptor = axios.interceptors.request.use(request => {
        // Clear any error
        // So when send a request we don't have any error
        this.setState({error: null})
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(response => response, (error) => {
        this.setState({error: error});
      });
    }

    componentWillUnmount() {
      // console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    // See the success response, too
    // componentWillMount() {
    //   axios.interceptors.request.use(req => {
    //     this.setState({ error: null, success: null });
    //     return req;
    //   });

    //   axios.interceptors.response.use(res => {
    //     if (res.config.method !== 'get') {
    //       this.setState({ success: 'Your request is already sent' });
    //     }
    //     return res;
    //   }, error => {
    //     this.setState({ error: error });
    //   });
    // }
 
 
    

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          {/* modalClosed is for the Modal when we click 
          net to it to close it */}
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>

          {/* <Modal show={this.state.error}
            modalClosed={this.errorConfirmedHandler} >
            {this.state.error ? this.state.error.message : null}
          </Modal >


          <Modal show={this.state.success}
            modalClosed={this.successConfirmedHandler} >
            {this.state.success ? this.state.success : null}
          </Modal> */}
          <WrapperdComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;