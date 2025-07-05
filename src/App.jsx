import { useState } from 'react'
import {Divider, Flex, Layout} from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const { Header, Content,Sider, Footer } = Layout
import AppTabs from './components/Tabs'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>Header</Header>
        <Content>
          <AppTabs />
        </Content>
        <Divider />
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}

export default App
