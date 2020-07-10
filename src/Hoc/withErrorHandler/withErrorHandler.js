import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../hoc/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null,
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                console.log(req);
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
                console.log(error);
            });
        }

        componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        modalHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        isOpen={this.state.error}
                        isClosed={this.modalHandler}
                    >
                        <p style={{ color: 'red', textAlign: 'center' }}>Oops, something went wrong!</p>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent{...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;