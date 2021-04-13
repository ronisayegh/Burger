import React, { Component } from 'react';
import Modal from '../../components/Burger/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        constructor(props){
            super(props);
            this.state={
                error:null
            }
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInter = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.request.eject(this.resInter);
        }
        errorCancelHandler = () =>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorCancelHandler} 
                        >
                        {this.state.error ? this.state.error.message :null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
