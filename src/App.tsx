import './App.css'
import { ShapeSelector } from './components/ShapeSelector/ShapeSelector'
import { StyleSelector } from './components/StyleSelector/StyleSelector'

function App() {
  return (
    <>
      <div className="max-w-4xl mx-auto my-6 p-4 border border-black rounded-sm">
        <h1 className="text-5xl mb-6">DoughLab</h1>
        <div className="grid grid-cols-2 gap-5">
          <ShapeSelector />
          <StyleSelector />
        </div>
      </div>
    </>
  )
}

export default App
