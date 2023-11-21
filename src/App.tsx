import { Content } from "./components/Content"
import { Header } from "./components/Header"
import { Layout } from "./components/Layout"
import { HomePage } from "./pages/HomePage"
import { HashRouter, Routes, Route } from "react-router-dom"
import { Page404 } from "./pages/Page404"
import { StatsPage } from "./pages/StatsPage"
import { Footer } from "./components/Footer"

function App() {
  return (
    <HashRouter>
      <Layout>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </HashRouter>
  )
}

export default App
