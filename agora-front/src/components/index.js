import React from 'react'
import { connect } from 'react-redux'
import Header from './header';
import Content from './content';
import styles from './styles.css';

export const Container = () => {
  return (
    <>
        <Header/>
        <Content/>
    </>    
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Container)